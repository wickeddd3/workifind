import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;

    const applicant = await prisma.applicant.findUnique({
      where: { userId },
      include: {
        savedJobs: true,
      },
    });

    if (!applicant) {
      return NextResponse.json(
        { error: "Applicant not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(applicant, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching applicant data" },
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

    const applicant = await prisma.applicant.update({
      where: { id: parseInt(id) },
      data: {
        ...form,
      },
    });

    if (!applicant) {
      return NextResponse.json(
        { error: "Applicant not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ applicant }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching applicant data" },
      { status: 500 },
    );
  }
}
