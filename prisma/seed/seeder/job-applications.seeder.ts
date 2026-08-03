import { buildJobApplicationData, pitches } from "../data";
import { logger, prisma } from "../helpers";

/**
 * How many applicants each of an employer's jobs receives, by the job's
 * position in that employer's list.
 *
 * Every employer gets the same spread, so whichever account you sign in as has
 * something to look at — previously applications only ever existed if someone
 * had applied by hand, which left three of the four seeded employers with an
 * empty applicants page and no way to tell that from a broken one.
 *
 * The trailing zero is deliberate: one job per employer stays empty so the
 * empty state is reachable without deleting anything.
 */
const APPLICANTS_PER_JOB = [3, 2, 1, 0];

/** Spacing between successive applications, so the list spans a few weeks. */
const APPLICATION_AGE_STEP_MS = 18 * 60 * 60 * 1000;

export async function seedJobApplications() {
  logger.start("Seeding job applications...");

  const [applicants, jobs] = await Promise.all([
    prisma.applicant.findMany({
      select: { id: true, userId: true, firstName: true, lastName: true },
      orderBy: { id: "asc" },
    }),
    prisma.job.findMany({
      select: { id: true, title: true, employerId: true },
      // Grouped by employer so a job's position within its own employer decides
      // how many applicants it gets.
      orderBy: [{ employerId: "asc" }, { id: "asc" }],
    }),
  ]);

  if (applicants.length === 0 || jobs.length === 0) {
    logger.skip("No applicants or jobs to link — skipping applications.");
    return;
  }

  // Rotates through applicants and pitches together, so consecutive
  // applications differ in both.
  let cursor = 0;
  let created = 0;
  let skipped = 0;
  let position = 0;
  let employerId: string | null = null;

  for (const job of jobs) {
    if (job.employerId !== employerId) {
      employerId = job.employerId;
      position = 0;
    } else {
      position++;
    }

    const wanted = Math.min(
      APPLICANTS_PER_JOB[position % APPLICANTS_PER_JOB.length],
      applicants.length,
    );

    for (let n = 0; n < wanted; n++) {
      const applicant = applicants[cursor % applicants.length];
      const pitch = pitches[cursor % pitches.length];
      const createdAt = new Date(Date.now() - cursor * APPLICATION_AGE_STEP_MS);
      cursor++;

      // Re-running the seed must not stack duplicate applications on a job, and
      // must leave any real ones already in the database alone.
      const existing = await prisma.jobApplication.findFirst({
        where: { jobId: job.id, applicantId: applicant.id },
        select: { id: true },
      });

      if (existing) {
        skipped++;
        continue;
      }

      try {
        await prisma.jobApplication.create({
          data: buildJobApplicationData({
            userId: applicant.userId,
            applicantId: applicant.id,
            jobId: job.id,
            pitch,
            createdAt,
          }),
        });
        created++;
        logger.info(
          `↳ ${applicant.firstName} ${applicant.lastName} → ${job.title} (job ${job.id})`,
        );
      } catch (error) {
        logger.error(`Application create failed for job ${job.id}`, error);
      }
    }
  }

  logger.success(
    `Job applications seeded: ${created} created, ${skipped} already present.`,
  );
}
