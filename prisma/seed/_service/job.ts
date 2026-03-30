import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createJob({
  userId,
  employerId,
  title,
  slug,
  employmentType,
  locationType,
  location,
  description,
  minSalary,
  maxSalary,
}: {
  userId: string;
  employerId: number;
  title: string;
  slug: string;
  employmentType: string;
  locationType: string;
  location: string;
  description: string;
  minSalary: number;
  maxSalary: number;
}) {
  try {
    const job = await prisma.job.create({
      data: {
        userId,
        employerId,
        title,
        slug,
        employmentType,
        locationType,
        location,
        description,
        minSalary,
        maxSalary,
      },
    });
    return job;
  } catch (error) {
    console.error(`❌ Prisma Error for Job ${title}:`, error);
    return null;
  }
}
