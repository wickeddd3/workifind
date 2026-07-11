import { prisma, createClerkUser, logger, SEED_PASSWORD } from "../helpers";
import { employers, buildEmployerData } from "../data";
import { seedJobs } from "./jobs.seeder";

export async function seedEmployers() {
  logger.start(`Seeding ${employers.length} employers...`);

  for (let i = 0; i < employers.length; i++) {
    const employerSeed = employers[i];

    const clerkUser = await createClerkUser({
      emailAddress: employerSeed.email,
      password: SEED_PASSWORD,
      firstName: employerSeed.firstName,
      lastName: employerSeed.lastName,
      publicMetadata: { role: "EMPLOYER" },
    });

    if (!clerkUser) {
      logger.skip(`Skipping employer for ${employerSeed.email}`);
      continue;
    }

    try {
      const employer = await prisma.employer.create({
        data: buildEmployerData(clerkUser.id, employerSeed, i),
      });
      logger.info(
        `Employer ${i + 1}/${employers.length}: ${employer.companyName}`,
      );

      // Each employer gets the full set of deterministic job templates.
      await seedJobs(clerkUser.id, employer.id);
    } catch (error) {
      logger.error(`Employer create failed for ${employerSeed.email}`, error);
    }
  }

  logger.success("Employers seeded.");
}
