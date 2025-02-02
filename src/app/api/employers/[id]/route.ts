import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;

    const employer = await prisma.employer.findUnique({
      where: { userId },
    });

    if (!employer) {
      return NextResponse.json(
        { error: "Employer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(employer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching employer data" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    const requestBody = await request.json();
    const { form } = requestBody;

    const employer = await prisma.employer.update({
      where: { id: parseInt(id) },
      data: {
        ...form,
      },
    });

    if (!employer) {
      return NextResponse.json(
        { error: "Employer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(employer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching employer data" },
      { status: 500 },
    );
  }
}
