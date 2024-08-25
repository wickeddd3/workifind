import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryParam = searchParams.get("q") ?? "";

  try {
    const applicantsCount = await prisma.applicant.count({
      where: {
        profession: {
          contains: queryParam,
          mode: "insensitive",
        },
      },
    });

    if (!applicantsCount) {
      return NextResponse.json(
        { error: "No professionals count" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { professionalsCount: applicantsCount },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching professionals count" },
      { status: 500 },
    );
  }
}
