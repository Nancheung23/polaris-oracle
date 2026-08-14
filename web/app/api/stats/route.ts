import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User, Report } from "@/lib/models";

export async function GET() {
  await connectDB();

  const [totalUsers, totalReports] = await Promise.all([
    User.countDocuments(),
    Report.countDocuments({ status: "completed" }),
  ]);

  return NextResponse.json({ totalUsers, totalReports }, { status: 200 });
}
