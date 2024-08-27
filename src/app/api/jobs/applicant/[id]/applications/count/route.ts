import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const jobApplicationsCount = await prisma.jobApplication.count({
      where: { applicantId: parseInt(id) },
    });

    if (!jobApplicationsCount) {
      return NextResponse.json(
        { error: "No job applications count" },
        { status: 404 },
      );
    }

    return NextResponse.json({ jobApplicationsCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching job applications count" },
      { status: 500 },
    );
  }
}
