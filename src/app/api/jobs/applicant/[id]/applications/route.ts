import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const jobApplications = await prisma.jobApplication.findMany({
      where: { applicantId: parseInt(id) },
      include: {
        job: true,
      },
    });

    if (!jobApplications) {
      return NextResponse.json(
        { error: "Job applications not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ jobApplications }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching job applications data" },
      { status: 500 },
    );
  }
}
