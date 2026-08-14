import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Report } from "@/lib/models";

export async function GET(req: NextRequest) {
  const walletAddress = req.nextUrl.searchParams.get("walletAddress");
  if (!walletAddress) {
    return NextResponse.json(
      { error: "Missing walletAddress" },
      { status: 400 },
    );
  }

  await connectDB();
  const reports = await Report.find({ walletAddress })
    .select("_id orderId name status createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(reports, { status: 200 });
}
