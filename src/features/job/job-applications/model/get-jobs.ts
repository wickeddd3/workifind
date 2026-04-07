import { getJobApplications, getJobApplicationsCount } from "../api/actions";
import { JobApplication } from "./types";

export async function getApplicantJobApplications(
  userId: string,
  searchParams: {
    size?: number;
    page?: number;
  },
): Promise<JobApplication[]> {
  try {
    const jobApplications = await getJobApplications(userId, searchParams);

    return jobApplications;
  } catch (error) {
    return [];
  }
}

export const getApplicantJobApplicationsCount = async (
  userId: string,
): Promise<number> => {
  try {
    const jobApplicationsCount = await getJobApplicationsCount(userId);

    return jobApplicationsCount;
  } catch (error) {
    return 0;
  }
};
