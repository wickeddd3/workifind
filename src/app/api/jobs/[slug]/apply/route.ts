import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();

  const { applicantId, jobId, form } = requestBody;

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

  try {
    const jobApplication = await prisma.jobApplication.create({
      data: {
        applicantId,
        jobId,
        ...form,
      },
    });

    return NextResponse.json({ jobApplication }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while saving job application" },
      { status: 500 },
    );
  }
}
