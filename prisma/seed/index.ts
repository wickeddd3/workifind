import { logger, prisma } from "./helpers";
import { seedApplicants } from "./seeder/applicants.seeder";
import { seedEmployers } from "./seeder/employers.seeder";
import { seedJobApplications } from "./seeder/job-applications.seeder";

async function main() {
  try {
    logger.start("Starting database seed...");
    await seedEmployers();
    await seedApplicants();
    // Last: it links the two above, and reads them back from the database
    // rather than the JSON, so it also works on a database that was already
    // seeded.
    await seedJobApplications();
    logger.success("Database seed complete.");
  } catch (error) {
    logger.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void main();
