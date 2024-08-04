import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const { userId, form } = requestBody;

  try {
    const applicant = await prisma.applicant.create({
      data: {
        userId,
        ...form,
      },
    });

    return NextResponse.json({ applicant }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while creating applicant" },
      { status: 500 },
    );
  }
}
