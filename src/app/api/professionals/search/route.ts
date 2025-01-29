import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Parse the URL
    const { searchParams } = new URL(request.url);
    // Destructure query parameters
    const {
      searchQuery = "",
      size = "10",
      page = "1",
    } = Object.fromEntries(searchParams);
    // Calculate the number of rows to skip
    const rowsToSkip = (parseInt(page) - 1) * parseInt(size);
    // Parse size to integer
    const take = size ? parseInt(size) : 10;
    // Fetch professionals from the database
    const professionals = await prisma.applicant.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        profession: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      take, // limit,
      skip: rowsToSkip, // offset,
    });

    if (!professionals) {
      return NextResponse.json(
        { error: "No professionals match on your query" },
        { status: 404 },
      );
    }

    return NextResponse.json(professionals, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error searching professionals" },
      { status: 500 },
    );
  }
}
