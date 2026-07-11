import { logger, prisma } from "./helpers";
import { seedApplicants } from "./seeder/applicants.seeder";
import { seedEmployers } from "./seeder/employers.seeder";

async function main() {
  try {
    logger.start("Starting database seed...");
    await seedEmployers();
    await seedApplicants();
    logger.success("Database seed complete.");
  } catch (error) {
    logger.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void main();
