import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createApplicant({
  userId,
  firstName,
  lastName,
  emailAddress,
  profession,
  experienced,
  skills,
  languages,
  availability,
  salaryExpectation,
  preferredLocations,
  preferredEmploymentTypes,
  preferredLocationTypes,
}: {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  profession: string;
  experienced: string;
  skills: string[];
  languages: string[];
  availability: string;
  salaryExpectation: number;
  preferredLocations: string[];
  preferredEmploymentTypes: string[];
  preferredLocationTypes: string[];
}) {
  try {
    const applicant = await prisma.applicant.create({
      data: {
        userId,
        firstName,
        lastName,
        email: emailAddress,
        profession,
        experienced,
        skills,
        languages,
        availability,
        salaryExpectation,
        preferredLocations,
        preferredEmploymentTypes,
        preferredLocationTypes,
      },
    });
    return applicant;
  } catch (error) {
    console.error(`❌ Prisma Error for Applicant ${emailAddress}:`, error);
    return null;
  }
}
