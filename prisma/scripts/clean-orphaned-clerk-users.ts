import { clerkClient } from "@clerk/nextjs/server";

import { applicants, employers } from "../seed/data";
import { deleteClerkUser, logger, prisma } from "../seed/helpers";

/**
 * Remove Clerk users left behind by a seed teardown that emptied the database
 * without managing to delete them.
 *
 * `clean.ts` finds the Clerk users to remove by reading their ids off the
 * Employer and Applicant rows. If those rows are gone but the Clerk users are
 * not, it has nothing left to match on and can never remove them — while
 * `seed` cannot recreate them either, because their email addresses are taken.
 * This script is the way out of that state, matching on the seed email
 * addresses in ./seed/data instead of on database rows.
 *
 * It only ever deletes a user whose email appears in those JSON files, and only
 * one with no profile row still pointing at it. Everyone else in the instance —
 * real sign-ups, your own account — is never a candidate.
 *
 * Pass --apply to perform the deletions; without it, it only reports.
 */

async function main() {
  const apply = process.argv.includes("--apply");

  const seedEmails = new Set(
    [...employers.map((e) => e.email), ...applicants.map((a) => a.email)].map(
      (email) => email.toLowerCase(),
    ),
  );

  logger.start(
    `Looking for orphaned Clerk users among ${seedEmails.size} seed addresses...`,
  );

  const clerk = await clerkClient();

  // Paginated: an instance with more than a page of users would otherwise hide
  // the very orphans being looked for.
  const found: { id: string; email: string }[] = [];
  const pageSize = 100;

  for (let offset = 0; ; offset += pageSize) {
    const { data } = await clerk.users.getUserList({
      limit: pageSize,
      offset,
    });
    if (data.length === 0) break;

    for (const user of data) {
      const email = user.emailAddresses
        .map((address) => address.emailAddress.toLowerCase())
        .find((address) => seedEmails.has(address));

      if (email) found.push({ id: user.id, email });
    }

    if (data.length < pageSize) break;
  }

  if (found.length === 0) {
    logger.success("No seed-owned Clerk users found. Nothing to do.");
    return;
  }

  // A seed user that still has its profile row is not an orphan — the ordinary
  // `seed:clean` owns that one, and it can remove the Clerk user and the row
  // together.
  const [stillLinkedEmployers, stillLinkedApplicants] = await Promise.all([
    prisma.employer.findMany({
      where: { userId: { in: found.map((user) => user.id) } },
      select: { userId: true },
    }),
    prisma.applicant.findMany({
      where: { userId: { in: found.map((user) => user.id) } },
      select: { userId: true },
    }),
  ]);

  const linked = new Set([
    ...stillLinkedEmployers.map((row) => row.userId),
    ...stillLinkedApplicants.map((row) => row.userId),
  ]);

  const orphans = found.filter((user) => !linked.has(user.id));

  for (const user of orphans) logger.info(`orphaned: ${user.email}`);
  for (const user of found.filter((u) => linked.has(u.id))) {
    logger.skip(`still has a profile row, leaving to seed:clean: ${user.email}`);
  }

  if (orphans.length === 0) {
    logger.success("No orphans. Nothing to do.");
    return;
  }

  if (!apply) {
    logger.info("");
    logger.success(
      `Dry run: ${orphans.length} user(s) would be deleted. Re-run with --apply.`,
    );
    return;
  }

  let deleted = 0;
  for (const user of orphans) {
    if (await deleteClerkUser(user.id)) deleted++;
  }

  logger.success(`Removed ${deleted}/${orphans.length} orphaned Clerk user(s).`);

  if (deleted < orphans.length) {
    logger.error("Some deletions failed; re-run to retry the remainder.");
    process.exitCode = 1;
  }
}

main()
  .catch((error) => {
    logger.error("Orphan cleanup failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
