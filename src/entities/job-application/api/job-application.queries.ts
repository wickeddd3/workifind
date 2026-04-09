import prisma from "@/shared/lib/prisma";

export async function checkIfAlreadyApplied(
  userId: string,
  jobId: number,
): Promise<boolean> {
  try {
    const jobApplication = await prisma.jobApplication.findFirst({
      where: { userId, jobId },
    });

    const hasApplied = !!jobApplication;

    return hasApplied;
  } catch (error) {
    return false;
  }
}
