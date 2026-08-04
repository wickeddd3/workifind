import { deleteClerkUser, logger, prisma } from "./helpers";

/**
 * Tear down seeded data.
 *
 * By default this removes the database rows and leaves the Clerk accounts
 * alone. That default changed when the seeder started adopting existing Clerk
 * users instead of failing on them: the same accounts now back a local database
 * and a hosted one, so deleting them from a local teardown would strand every
 * profile row in the other environment — the app would sign nobody in and every
 * profile page would 404, with nothing in the local database to explain why.
 *
 * Pass `--with-clerk-users` for the full teardown, when the accounts really are
 * meant to go. That path removes the Clerk users first, so a re-run can still
 * find and finish cleaning any profiles left behind.
 *
 * Either way the work is scoped by the profile owners' userIds, so rows
 * belonging to anyone who signed up for real are untouched.
 */
async function clean() {
  const withClerkUsers = process.argv.includes("--with-clerk-users");

  logger.start(
    withClerkUsers
      ? "Cleaning seeded data and their Clerk accounts..."
      : "Cleaning seeded database rows (Clerk accounts kept)...",
  );

  // Every DB profile mirrors a Clerk user via its userId.
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

  logger.info(`Found ${userIds.length} profile owner(s).`);

  if (withClerkUsers) {
    // 1. Remove the Clerk users first (see idempotency note above).
    let deleted = 0;
    let failed = 0;
    for (const userId of userIds) {
      if (await deleteClerkUser(userId)) deleted++;
      else failed++;
    }
    logger.success(`Removed ${deleted}/${userIds.length} Clerk user(s).`);

    // Stop before touching the database if any of them survived. These rows are
    // the only record of which Clerk users belong to the seed — delete them
    // while the users are still there and nothing can ever find them again:
    // this script has nothing left to match on, and `seed` cannot recreate them
    // either, because their email addresses are taken. That is exactly how the
    // instance ended up with ten unreachable users once already, when the Clerk
    // key was not loaded and every deletion here failed silently.
    if (failed > 0) {
      logger.error(
        `${failed} Clerk user(s) could not be removed. Leaving the database ` +
          `untouched so this can be retried — its rows are the only way back ` +
          `to those users. Run npm run seed:clean-orphans if they are already ` +
          `stranded.`,
      );
      process.exitCode = 1;
      return;
    }
  } else {
    logger.info(
      "Keeping the Clerk accounts — re-running `npm run seed` against this " +
        "database will adopt them and rebuild the profile rows. Use " +
        "--with-clerk-users to remove them as well.",
    );
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
