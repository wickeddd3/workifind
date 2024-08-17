import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();

  const { applicantId, jobId } = requestBody;

  try {
    const unsavedJob = await prisma.savedJob.deleteMany({
      where: {
        applicantId: parseInt(applicantId),
        jobId: parseInt(jobId),
      },
    });

    return NextResponse.json({ unsavedJob }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while saving job application" },
      { status: 500 },
    );
  }
}
