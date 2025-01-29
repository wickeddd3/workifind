import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Parse the URL
    const { searchParams } = new URL(request.url);
    // Destructure query parameters
    const { searchQuery = "" } = Object.fromEntries(searchParams);
    // Count the number of companies that match the search criteria
    const companiesCount = await prisma.employer.count({
      where: {
        companyName: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });

    if (!companiesCount) {
      return NextResponse.json(
        { error: "No companies count" },
        { status: 404 },
      );
    }

    return NextResponse.json(companiesCount, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching companies count" },
      { status: 500 },
    );
  }
}
