import { baseUrl } from "@/config/base-url";
import { JobApplicationSchemaType } from "@/schema/job-application";

export const getJobApplications = async ({
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
      `${baseUrl}/api/applicants/${userId}/job-applications?${searchParams.toString()}`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getJobApplicationsCount = async (userId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/applicants/${userId}/job-applications/count`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const applyToJob = async (
  userId: string,
  jobId: number,
  formData: JobApplicationSchemaType,
) => {
  try {
    // Fetch auth user applicant profile data
    const applicantResponse = await fetch(
      `${baseUrl}/api/applicants/${userId}`,
    );
    const applicantResponseData = await applicantResponse.json();

    // Return null if no applicantResponseData
    if (!applicantResponseData) return null;

    const response = await fetch(
      `${baseUrl}/api/applicants/${userId}/job/${jobId}/apply`,
      {
        method: "POST",
        body: JSON.stringify({
          applicantId: applicantResponseData.id,
          form: formData,
        }),
      },
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const applyToJobAuthorize = async (userId: string, jobId: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/applicants/${userId}/job/${jobId}/apply/authorize`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
