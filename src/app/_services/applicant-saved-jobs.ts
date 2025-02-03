import { baseUrl } from "@/lib/baseUrl";

export const getSavedJobs = async ({
  userId,
  jobsPerPage,
  page,
}: {
  userId: string;
  jobsPerPage: number;
  page: number;
}) => {
  try {
    const searchParams = new URLSearchParams({
      ...(jobsPerPage && { jobsPerPage: jobsPerPage.toString() }),
      ...(page && { page: page.toString() }),
    });

    const response = await fetch(
      `${baseUrl}/api/applicants/${userId}/saved-jobs?${searchParams.toString()}`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getSavedJobsCount = async (userId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/applicants/${userId}/saved-jobs/count`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

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

export const saveJob = async (userId: string, jobId: number) => {
  try {
    // Fetch auth user applicant profile data
    const applicantResponse = await fetch(
      `${baseUrl}/api/applicants/${userId}`,
    );
    const applicantResponseData = await applicantResponse.json();

    // Return null if no applicantResponseData
    if (!applicantResponseData) return null;

    const response = await fetch(
      `${baseUrl}/api/applicants/${userId}/job/${jobId}/save`,
      {
        method: "POST",
        body: JSON.stringify({
          applicantId: applicantResponseData.id,
        }),
      },
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const unsaveJob = async (userId: string, jobId: number) => {
  try {
    // Fetch auth user applicant profile data
    const applicantResponse = await fetch(
      `${baseUrl}/api/applicants/${userId}`,
    );
    const applicantResponseData = await applicantResponse.json();

    // Return null if no applicantResponseData
    if (!applicantResponseData) return null;

    const response = await fetch(
      `${baseUrl}/api/applicants/${userId}/job/${jobId}/save`,
      {
        method: "DELETE",
      },
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const saveJobAuthorize = async (userId: string, jobId: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/applicants/${userId}/job/${jobId}/save/authorize`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
