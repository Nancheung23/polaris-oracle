import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Report } from "@/lib/models";

const PENDING_TIMEOUT_MS = 5 * 60 * 1000;
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await connectDB();
  const report = await Report.findById(id);

  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  if (
    report.status === "pending" &&
    Date.now() - report.createdAt.getTime() > PENDING_TIMEOUT_MS
  ) {
    report.status = "failed";
    await report.save();
  }

  return NextResponse.json(report, { status: 200 });
}
