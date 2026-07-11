import { prisma, logger } from "./helpers";
import { seedEmployers } from "./seeder/employers.seeder";
import { seedApplicants } from "./seeder/applicants.seeder";

async function main() {
  logger.start("Starting database seed...");
  await seedEmployers();
  await seedApplicants();
  logger.success("Database seed complete.");
}

main()
  .catch((error) => {
    logger.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
