import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { role } = await req.json();
    const { userId } = auth();

    if (!userId || !role) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await clerkClient().users.updateUserMetadata(userId, {
      unsafeMetadata: { role },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating Clerk metadata:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 },
    );
  }
}
