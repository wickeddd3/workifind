import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string; jobId: string } },
) {
  try {
    const userId = params.id;
    const jobId = parseInt(params.jobId);

    const jobApplication = await prisma.jobApplication.findFirst({
      where: { userId, jobId },
    });

    const isAuthorized = jobApplication ? false : true;

    return NextResponse.json(isAuthorized, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while authorizing user" },
      { status: 500 },
    );
  }
}
