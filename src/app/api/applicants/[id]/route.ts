import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const applicant = await prisma.applicant.findUnique({
      where: { userId: parseInt(id) },
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
