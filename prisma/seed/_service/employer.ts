import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createEmployer({
  userId,
  slug,
  companyName,
  companyEmail,
  companyWebsite,
  industry,
  location,
  about,
  perks,
}: {
  userId: string;
  slug: string;
  companyName: string;
  companyEmail: string;
  companyWebsite: string;
  industry: string;
  location: string;
  about: string;
  perks: string[];
}) {
  try {
    const employer = await prisma.employer.create({
      data: {
        userId,
        slug,
        companyName,
        companyEmail,
        companyWebsite,
        industry,
        location,
        about,
        perks,
      },
    });
    return employer;
  } catch (error) {
    console.error(`❌ Prisma Error for Employer ${companyName}:`, error);
    return null;
  }
}
