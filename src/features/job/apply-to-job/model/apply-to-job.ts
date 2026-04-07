import { JobApplication } from "@prisma/client";
import { saveJobApplication } from "../api/actions";

export async function applyToJob(
  userId: string,
  applicantId: number,
  jobId: number,
  formData: {
    pitch: string;
  },
): Promise<JobApplication | null> {
  try {
    const jobApplication = await saveJobApplication(
      userId,
      applicantId,
      jobId,
      formData,
    );

    return jobApplication;
  } catch (error) {
    return null;
  }
}
