import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { form } = requestBody;
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        {
          error:
            "Error occurred, only authenticated user can create applicant profile",
        },
        { status: 401 },
      );
    }

    const applicant = await prisma.applicant.create({
      data: {
        ...form,
        userId,
      },
    });

    return NextResponse.json(applicant, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error occurred while creating applicant profile" },
      { status: 500 },
    );
  }
}
