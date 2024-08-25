import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryParam = searchParams.get("q") ?? "";

  try {
    const employersCount = await prisma.employer.count({
      orderBy: { createdAt: "desc" },
      where: {
        companyName: {
          contains: queryParam,
          mode: "insensitive",
        },
      },
    });

    if (!employersCount) {
      return NextResponse.json(
        { error: "No companies count" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { companiesCount: employersCount },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching companies count" },
      { status: 500 },
    );
  }
}
