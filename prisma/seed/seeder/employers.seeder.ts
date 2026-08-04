import { buildEmployerData, employers, jobsByEmployer } from "../data";
import { ensureClerkUser, logger, prisma, SEED_PASSWORD } from "../helpers";
import { seedJobs } from "./jobs.seeder";

export async function seedEmployers() {
  const totalJobs = jobsByEmployer.reduce((sum, list) => sum + list.length, 0);
  logger.start(
    `Seeding ${employers.length} employers and ${totalJobs} jobs...`,
  );

  let jobsCreated = 0;
  let skipped = 0;
  let adopted = 0;

  for (let i = 0; i < employers.length; i++) {
    const employerSeed = employers[i];

    const clerkUser = await ensureClerkUser({
      emailAddress: employerSeed.email,
      password: SEED_PASSWORD,
      firstName: employerSeed.firstName,
      lastName: employerSeed.lastName,
      publicMetadata: { role: "EMPLOYER" },
    });

    if (!clerkUser) {
      logger.skip(`Skipping employer for ${employerSeed.email}`);
      skipped++;
      continue;
    }

    if (!clerkUser.created) adopted++;

    try {
      const employer = await prisma.employer.create({
        data: buildEmployerData(clerkUser.id, employerSeed, i),
      });
      logger.info(
        `Employer ${i + 1}/${employers.length}: ${employer.companyName} — ${employer.industry}, ${employer.location}`,
      );

      // The employer's own jobs, not a shared template list. The seed position
      // is passed alongside the id — it, not the uuid, is what keeps the job
      // slugs stable across runs.
      jobsCreated += await seedJobs(
        clerkUser.id,
        employer.id,
        `e${i + 1}`,
        jobsByEmployer[i],
      );
    } catch (error) {
      logger.error(`Employer create failed for ${employerSeed.email}`, error);
      skipped++;
    }
  }

  logger.success(
    `Employers seeded: ${employers.length - skipped}/${employers.length}, with ${jobsCreated} jobs` +
      // Worth stating rather than leaving to be inferred: adopting means this
      // database's rows now point at Clerk accounts another database also
      // points at, which is the whole intent but also the reason `seed:clean`
      // needs care.
      (adopted > 0
        ? ` (${adopted} existing Clerk account${adopted === 1 ? "" : "s"} reused).`
        : "."),
  );
}
