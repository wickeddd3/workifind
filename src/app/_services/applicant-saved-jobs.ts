import { baseUrl } from "@/shared/config/base-url";

export const getInitialSavedJobs = async (userId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/applicants/${userId}/saved-jobs/initial`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
