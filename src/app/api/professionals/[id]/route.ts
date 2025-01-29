import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    const professional = await prisma.applicant.findUnique({
      where: { id: parseInt(id) },
    });

    if (!professional) {
      return NextResponse.json(
        { error: "Professional not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(professional, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching professional data" },
      { status: 500 },
    );
  }
}
