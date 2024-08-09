import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();

  const { authorId, employerId, form } = requestBody;

  if (!authorId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!employerId) {
    return NextResponse.json(
      {
        error:
          "No profile, Auth user needs to have a profile before creating a job",
      },
      { status: 400 },
    );
  }

  try {
    const job = await prisma.job.create({
      data: {
        authorId,
        employerId,
        ...form,
      },
    });

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while creating job" },
      { status: 500 },
    );
  }
}
