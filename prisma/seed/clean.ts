import { deleteClerkUser, logger, prisma } from "./helpers";

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
  let failed = 0;
  for (const userId of userIds) {
    if (await deleteClerkUser(userId)) deleted++;
    else failed++;
  }
  logger.success(`Removed ${deleted}/${userIds.length} Clerk user(s).`);

  // Stop before touching the database if any of them survived. These rows are
  // the only record of which Clerk users belong to the seed — delete them while
  // the users are still there and nothing can ever find them again: this script
  // has nothing left to match on, and `seed` cannot recreate them either,
  // because their email addresses are taken. That is exactly how the instance
  // ended up with ten unreachable users once already, when the Clerk key was
  // not loaded and every deletion here failed silently.
  if (failed > 0) {
    logger.error(
      `${failed} Clerk user(s) could not be removed. Leaving the database ` +
        `untouched so this can be retried — its rows are the only way back to ` +
        `those users. Run npm run seed:clean-orphans if they are already ` +
        `stranded.`,
    );
    process.exitCode = 1;
    return;
  }

  // 2. Remove the DB rows in FK-safe order, scoped to those owners.
  const where = { userId: { in: userIds } };
  await prisma.savedJob.deleteMany({ where });
  await prisma.jobApplication.deleteMany({ where });
  await prisma.job.deleteMany({ where });
  await prisma.employer.deleteMany({ where });
  await prisma.applicant.deleteMany({ where });
  logger.success("Database records removed.");
}

async function run() {
  try {
    await clean();
  } catch (error) {
    logger.error("Clean failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void run();
