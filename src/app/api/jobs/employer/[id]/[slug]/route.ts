import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string; slug: string } },
) {
  const id = params.id;
  const slug = params.slug;

  try {
    const job = await prisma.job.findUnique({
      where: { authorId: parseInt(id), slug },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching job data" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string; slug: string } },
) {
  const id = params.id;
  const slug = params.slug;
  const requestBody = await request.json();
  const { form } = requestBody;

  try {
    const job = await prisma.job.update({
      where: { authorId: parseInt(id), slug },
      data: {
        ...form,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching job data" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; slug: string } },
) {
  const id = params.id;
  const slug = params.slug;

  try {
    const job = await prisma.job.delete({
      where: { authorId: parseInt(id), slug },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching job data" },
      { status: 500 },
    );
  }
}
