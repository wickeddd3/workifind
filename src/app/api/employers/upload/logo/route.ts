import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    // Read file from request body
    const file = await req.blob();

    if (!file) {
      return new NextResponse(JSON.stringify({ error: "No file provided" }), {
        status: 400,
      });
    }

    // Upload file to Vercel Blob Storage
    const blob = await put(
      `company-logo/${Date.now()}-${Math.random().toString(36).substring(7)}`,
      file,
      {
        access: "public", // Set to "private" if you don't want public access
      },
    );

    return new NextResponse(JSON.stringify(blob.url), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
    });
  }
}
