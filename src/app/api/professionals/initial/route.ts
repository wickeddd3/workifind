import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const takeParam = searchParams.get("take") ?? "0";
  const take = parseInt(takeParam) || 8;

  try {
    const professionals = await prisma.applicant.findMany({
      orderBy: { createdAt: "desc" },
      take,
    });

    if (!professionals) {
      return NextResponse.json(
        { error: "No professionals found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ professionals }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching initial professionals list data" },
      { status: 500 },
    );
  }
}
