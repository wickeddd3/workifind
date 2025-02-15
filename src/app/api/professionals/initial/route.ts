import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Parse the URL
    const { searchParams } = new URL(request.url);
    // Destructure query parameters
    const { size = "" } = Object.fromEntries(searchParams);
    // Parse size to integer
    const take = parseInt(size) || 8;
    // Fetch initial list of professionals
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

    return NextResponse.json(professionals, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching initial professionals list data" },
      { status: 500 },
    );
  }
}
