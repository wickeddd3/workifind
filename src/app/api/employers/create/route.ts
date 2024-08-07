import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const { userId, form } = requestBody;

  try {
    const employer = await prisma.employer.create({
      data: {
        userId,
        ...form,
      },
    });

    return NextResponse.json({ employer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while creating employer" },
      { status: 500 },
    );
  }
}
