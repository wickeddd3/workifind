import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string; jobId: string } },
) {
  try {
    const userId = params.id;
    const jobId = parseInt(params.jobId);

    const job = await prisma.job.findUnique({
      where: { userId, id: jobId },
      include: {
        employer: true,
        jobApplications: {
          include: {
            applicant: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching job post" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string; jobId: string } },
) {
  try {
    const userId = params.id;
    const jobId = parseInt(params.jobId);
    const requestBody = await request.json();
    const { form } = requestBody;

    const job = await prisma.job.update({
      where: { userId, id: jobId },
      data: {
        ...form,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while updating job post" },
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

    const job = await prisma.job.delete({
      where: { userId, id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while deleting job post" },
      { status: 500 },
    );
  }
}
