import { prisma, deleteClerkUser, logger } from "./helpers";

/**
 * Tear down seeded data: for every Employer/Applicant profile in the DB,
 * remove the owning Clerk user and then the profile (and everything that
 * hangs off it). Scoped by the profile owners' userIds so unrelated rows are
 * left untouched. Idempotent — Clerk users are removed first so a re-run can
 * still find (and finish cleaning) any orphaned profiles.
 */
async function clean() {
  logger.start("Cleaning seeded data...");

  // Every DB profile mirrors a seeded Clerk user via its userId.
  const [employers, applicants] = await Promise.all([
    prisma.employer.findMany({ select: { userId: true } }),
    prisma.applicant.findMany({ select: { userId: true } }),
  ]);

  const userIds = Array.from(
    new Set([
      ...employers.map((e) => e.userId),
      ...applicants.map((a) => a.userId),
    ]),
  );

  if (userIds.length === 0) {
    logger.success("Nothing to clean.");
    return;
  }

  logger.info(`Found ${userIds.length} profile owner(s) to remove.`);

  // 1. Remove the Clerk users first (see idempotency note above).
  let deleted = 0;
  for (const userId of userIds) {
    if (await deleteClerkUser(userId)) deleted++;
  }
  logger.success(`Removed ${deleted}/${userIds.length} Clerk user(s).`);

  // 2. Remove the DB rows in FK-safe order, scoped to those owners.
  const where = { userId: { in: userIds } };
  await prisma.savedJob.deleteMany({ where });
  await prisma.jobApplication.deleteMany({ where });
  await prisma.job.deleteMany({ where });
  await prisma.employer.deleteMany({ where });
  await prisma.applicant.deleteMany({ where });
  logger.success("Database records removed.");
}

clean()
  .catch((error) => {
    logger.error("Clean failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
