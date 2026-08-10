import { GENDER, type Gender } from "@/lib/constants/gender";
import { SHICHEN, type Shichen } from "@/lib/constants/shichen";
import { connectDB } from "@/lib/db";
import { Report } from "@/lib/models";
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
  const exisitingReport = await Report.findOne({ txSignature });
  if (exisitingReport) {
    // return report if exist
    return NextResponse.json(exisitingReport, { status: 200 });
  }
  // is valid ticket?
  const result = await verifyConsumeTicketTx(txSignature, walletAddress);
  if (!result.valid) {
    return NextResponse.json(
      { error: result.valid || "Invalid ticket" },
      { status: 400 },
    );
  }

  // get orderId
}
