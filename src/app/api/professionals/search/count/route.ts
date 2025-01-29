import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Parse the URL
    const { searchParams } = new URL(request.url);
    // Destructure query parameters
    const { searchQuery = "" } = Object.fromEntries(searchParams);
    // Count the number of professionals that match the search criteria
    const professionalsCount = await prisma.applicant.count({
      where: {
        profession: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });

    if (!professionalsCount) {
      return NextResponse.json(
        { error: "No professionals count" },
        { status: 404 },
      );
    }

    return NextResponse.json(professionalsCount, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching professionals count" },
      { status: 500 },
    );
  }
}
