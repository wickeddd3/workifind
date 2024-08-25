import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryParam = searchParams.get("q") ?? "";
  const takeParam = searchParams.get("take");
  const skipParam = searchParams.get("skip");
  const take = takeParam ? parseInt(takeParam) : 10;
  const skip = skipParam ? parseInt(skipParam) : 0;

  try {
    const employers = await prisma.employer.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        companyName: {
          contains: queryParam,
          mode: "insensitive",
        },
      },
      take,
      skip,
    });

    if (!employers) {
      return NextResponse.json(
        { error: "No companies match on your query" },
        { status: 404 },
      );
    }

    return NextResponse.json({ companies: employers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error searching companies" },
      { status: 500 },
    );
  }
}
