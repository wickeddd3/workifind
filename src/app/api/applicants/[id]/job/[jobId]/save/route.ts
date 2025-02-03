import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string; jobId: string } },
) {
  try {
    const userId = params.id;
    const jobId = parseInt(params.jobId);
    const requestBody = await request.json();

    const { applicantId } = requestBody;

    if (!applicantId) {
      return NextResponse.json(
        {
          error:
            "No profile, Auth user needs to have an applicant profile before applying to a job",
        },
        { status: 400 },
      );
    }

    if (!jobId) {
      return NextResponse.json({ error: "Job Id missing" }, { status: 400 });
    }

    const savedJob = await prisma.savedJob.create({
      data: {
        userId,
        applicantId: parseInt(applicantId),
        jobId,
      },
    });

    return NextResponse.json(savedJob, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while saving job application" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; jobId: string } },
) {
  try {
    const userId = params.id;
    const jobId = parseInt(params.jobId);

    const unsavedJob = await prisma.savedJob.deleteMany({
      where: {
        userId,
        jobId: jobId,
      },
    });

    return NextResponse.json(unsavedJob, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while saving job application" },
      { status: 500 },
    );
  }
}
