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
            "Error occurred, only authenticated user can create employer profile",
        },
        { status: 401 },
      );
    }

    const employer = await prisma.employer.create({
      data: {
        ...form,
        userId,
      },
    });

    return NextResponse.json(employer, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error occurred while creating employer profile" },
      { status: 500 },
    );
  }
}
