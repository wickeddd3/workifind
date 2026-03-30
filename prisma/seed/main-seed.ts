import { PrismaClient } from "@prisma/client";
import { createEmployers } from "./employers-seed";
import { createApplicants } from "./applicants-seed";

const prisma = new PrismaClient();

async function main() {
  const employersCount = 10; // Adjust this number to create more or fewer employers
  const applicantsCount = 30; // Adjust this number to create more or fewer applicants
  await createEmployers(employersCount);
  await createApplicants(applicantsCount);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
