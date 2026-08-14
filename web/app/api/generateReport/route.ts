import { GENDER, type Gender } from "@/lib/constants/gender";
import { SHICHEN, type Shichen } from "@/lib/constants/shichen";
import { connectDB } from "@/lib/db";
import { Report, User } from "@/lib/models";
import { getLatestOrderId } from "@/lib/solana/getLastestOrderId";
import { verifyConsumeTicketTx } from "@/lib/solana/verifyTransaction";
import { generateReportContent } from "@/lib/ai/generateReportContent";
import { NextRequest, NextResponse, after } from "next/server";

interface GenerateReportRequest {
  name: string;
  gender: Gender;
  birthDate: string;
  shichen: Shichen;
  location: string;
  txSignature: string;
  walletAddress: string;
}

export async function POST(req: NextRequest) {
  const body: GenerateReportRequest = await req.json();
  const {
    name,
    gender,
    birthDate,
    shichen,
    location,
    txSignature,
    walletAddress,
  } = body;

  if (
    !name ||
    !gender ||
    !birthDate ||
    !shichen ||
    !location ||
    !txSignature ||
    !walletAddress
  ) {
    return NextResponse.json(
      { error: "Missing fields as required" },
      { status: 400 },
    );
  }

  const validGenders = GENDER.map((g) => g.value);
  const validShichen = SHICHEN.map((s) => s.value);
  if (!validGenders.includes(gender) || !validShichen.includes(shichen)) {
    return NextResponse.json(
      { error: "Invalid gender or shichen value" },
      { status: 400 },
    );
  }

  await connectDB();
  const existingReport = await Report.findOne({ txSignature });
  if (existingReport) {
    return NextResponse.json(existingReport, { status: 200 });
  }

  const result = await verifyConsumeTicketTx(txSignature, walletAddress);
  if (!result.valid) {
    return NextResponse.json(
      { error: result.reason || "Invalid ticket" },
      { status: 400 },
    );
  }

  const orderId = await getLatestOrderId(walletAddress);
  if (typeof orderId !== "number" || orderId === null) {
    return NextResponse.json(
      { error: orderId || "Invalid order" },
      { status: 400 },
    );
  }

  const report = await Report.create({
    walletAddress,
    txSignature,
    orderId,
    name,
    gender,
    birthDate: new Date(birthDate),
    shichen,
    location,
    status: "pending",
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  });

  await User.findOneAndUpdate(
    { walletAddress },
    { $inc: { reportCount: 1 }, $set: { lastActiveAt: new Date() } },
    { upsert: true },
  );

  // 1 min
  after(async () => {
    try {
      const { reportContent, totalCost } = await generateReportContent({
        name,
        gender,
        birthDate: new Date(birthDate),
        shichen,
        location,
      });
      await Report.findByIdAndUpdate(report._id, {
        reportContent,
        status: "completed",
      });
      console.log(
        `Report ${report._id} completed. AI cost: $${totalCost.toFixed(4)}`,
      );
    } catch (err) {
      console.error(`Report ${report._id} generation failed:`, err);
      await Report.findByIdAndUpdate(report._id, { status: "failed" });
    }
  });

  return NextResponse.json(report, { status: 200 });
}
