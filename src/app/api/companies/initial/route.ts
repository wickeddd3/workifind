import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const takeParam = searchParams.get("take") ?? "0";
  const take = parseInt(takeParam) || 8;

  try {
    const employers = await prisma.employer.findMany({
      orderBy: { createdAt: "desc" },
      take,
    });

    if (!employers) {
      return NextResponse.json(
        { error: "No companies found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ companies: employers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching initial companies list data" },
      { status: 500 },
    );
  }
}
