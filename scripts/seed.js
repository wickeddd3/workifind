const { applicantsData } = require("./applicants-data");
const { employersData } = require("./employers-data");
const { jobsData } = require("./jobs-data");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    applicantsData.map(async (applicant) => {
      await prisma.applicant.create({
        data: {
          ...applicant,
        },
      });
    }),
  );
  await Promise.all(
    employersData.map(async (employer) => {
      await prisma.employer.create({
        data: {
          ...employer,
        },
      });
    }),
  );
  await Promise.all(
    jobsData.map(async (job) => {
      await prisma.job.create({
        data: {
          ...job,
        },
      });
    }),
  );
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
