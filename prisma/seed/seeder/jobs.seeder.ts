import { buildJobData, jobs } from "../data";
import { logger, prisma } from "../helpers";

export async function seedJobs(userId: string, employerId: number) {
  for (let i = 0; i < jobs.length; i++) {
    try {
      const job = await prisma.job.create({
        data: buildJobData(userId, employerId, jobs[i], i),
      });
      logger.info(`↳ Job ${i + 1}/${jobs.length}: ${job.title}`);
    } catch (error) {
      logger.error(`Job create failed for employer ${employerId}`, error);
    }
  }
}
