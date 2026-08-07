import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, gender, birthDate, shichen, location, txSignature } = body;

    console.log("Got info:", { name, gender, birthDate, shichen, location, txSignature });

    // TODO: verify txSignature
    // TODO: combine prompt to call AI(x402)
    // TODO: store in database

    return NextResponse.json({
      success: true,
      message: "Report generation placeholder",
      receivedData: body,
    });
  } catch (error) {
    console.error("Failed to generate:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate report" },
      { status: 500 }
    );
  }
}