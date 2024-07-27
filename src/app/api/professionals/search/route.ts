import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryParam = searchParams.get("q") ?? "";

  try {
    const professionals = await prisma.applicant.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        firstName: {
          contains: queryParam,
          mode: "insensitive",
        },
      },
    });

    if (!professionals) {
      return NextResponse.json(
        { error: "No professionals match on your query" },
        { status: 404 },
      );
    }

    return NextResponse.json({ professionals }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error searching professionals" },
      { status: 500 },
    );
  }
}
