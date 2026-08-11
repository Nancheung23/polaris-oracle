import { GENDER, type Gender } from "@/lib/constants/gender";
import { SHICHEN, type Shichen } from "@/lib/constants/shichen";
import { connectDB } from "@/lib/db";
import { Report, User } from "@/lib/models";
import { getLatestOrderId } from "@/lib/solana/getLastestOrderId";
import { verifyConsumeTicketTx } from "@/lib/solana/verifyTransaction";
import { NextRequest, NextResponse } from "next/server";
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
  console.log("body:", body);
  const {
    name,
    gender,
    birthDate,
    shichen,
    location,
    txSignature,
    walletAddress,
  } = body;
  // validate empty
  if (
    !name ||
    !gender ||
    !birthDate ||
    !shichen ||
    !location ||
    !txSignature ||
    !walletAddress
  ) {
    console.log("first");
    return NextResponse.json(
      { error: "Missing fields as required" },
      { status: 400 },
    );
  }
  const validGenders = GENDER.map((g) => g.value);
  const validShichen = SHICHEN.map((s) => s.value);
  if (!validGenders.includes(gender) || !validShichen.includes(shichen)) {
    console.log("second");
    return NextResponse.json(
      { error: "Invalid gender or shichen value" },
      { status: 400 },
    );
  }
  await connectDB();
  const exisitingReport = await Report.findOne({ txSignature });
  if (exisitingReport) {
    // return report if exist
    console.log("third");
    return NextResponse.json(exisitingReport, { status: 200 });
  }
  // is valid ticket?
  const result = await verifyConsumeTicketTx(txSignature, walletAddress);
  if (!result.valid) {
    console.log("fourth");
    return NextResponse.json(
      { error: result.reason || "Invalid ticket" },
      { status: 400 },
    );
  }

  // get orderId (Promise<number>)
  const orderId = await getLatestOrderId(walletAddress);
  if (typeof orderId !== "number" || orderId === null) {
    console.log("fifth");
    return NextResponse.json(
      { error: orderId || "Invalid order" },
      { status: 400 },
    );
  }

  // store to database and status pending
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
    // expires after 15 days
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  });

  // update User
  await User.findOneAndUpdate(
    { walletAddress },
    { $inc: { reportCount: 1 }, $set: { lastActiveAt: new Date() } },
    { upsert: true },
  );

  return NextResponse.json(report, { status: 200 });
}
