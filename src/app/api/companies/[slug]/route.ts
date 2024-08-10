import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;

  try {
    const company = await prisma.employer.findUnique({
      where: { slug },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({ company }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching company data" },
      { status: 500 },
    );
  }
}
