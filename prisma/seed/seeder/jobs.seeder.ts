import { buildJobData, type JobSeed } from "../data";
import { logger, prisma } from "../helpers";

/**
 * Post one employer's jobs.
 *
 * The list is passed in rather than read from a shared file, which is the whole
 * change: every employer used to be given the same four job templates, so fifty
 * companies would have advertised the same four titles at the same four
 * salaries. Each employer now gets its own list, drawn from the roles its
 * industry actually hires for.
 */
export async function seedJobs(
  userId: string,
  employerId: string,
  employerRef: string,
  jobs: JobSeed[],
): Promise<number> {
  let created = 0;

  for (let i = 0; i < jobs.length; i++) {
    try {
      await prisma.job.create({
        data: buildJobData(userId, employerId, jobs[i], i, employerRef),
      });
      created++;
    } catch (error) {
      logger.error(`Job create failed for employer ${employerId}`, error);
    }
  }

  // One line per employer rather than one per job: at three hundred jobs, the
  // previous per-job logging buried everything else in the run.
  logger.info(`↳ ${created}/${jobs.length} jobs posted`);

  return created;
}
