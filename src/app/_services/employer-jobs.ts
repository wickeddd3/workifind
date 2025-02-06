import { baseUrl } from "@/config/base-url";
import { toSlug } from "@/utils/format-text";
import { JobSchemaType } from "@/schema/job";
import { nanoid } from "nanoid";

export async function createJob(userId: string, formData: JobSchemaType) {
  // Fetch auth user employer profile data
  const employerResponse = await fetch(`${baseUrl}/api/employers/${userId}`);
  const employerResponseData = await employerResponse.json();

  // Return null if no employerResponseData
  if (!employerResponseData) return null;

  // Create slug based on job title
  const slug = `${toSlug(formData.title)}-${nanoid(10)}`;

  // Prepare Form Data
  const form = {
    ...formData,
    slug,
    minSalary: parseInt(formData?.minSalary?.toString() || "0"),
    maxSalary: parseInt(formData?.maxSalary?.toString() || "0"),
  };

  // Create Job post
  const response = await fetch(`${baseUrl}/api/employers/${userId}/jobs`, {
    method: "POST",
    body: JSON.stringify({
      employerId: employerResponseData?.id,
      form,
    }),
  });

  return response.json();
}

export async function updateJob(
  userId: string,
  jobId: number,
  formData: JobSchemaType,
) {
  // Fetch auth user employer profile data
  const employerResponse = await fetch(`${baseUrl}/api/employers/${userId}`);
  const employerResponseData = await employerResponse.json();

  // Return null if no employerResponseData
  if (!employerResponseData) return null;

  // Create slug based on job title
  const slug = `${toSlug(formData.title)}-${nanoid(10)}`;

  // Prepare Form Data
  const form = {
    ...formData,
    slug,
    minSalary: parseInt(formData?.minSalary?.toString() || "0"),
    maxSalary: parseInt(formData?.maxSalary?.toString() || "0"),
  };

  // Update Job post
  const response = await fetch(
    `${baseUrl}/api/employers/${userId}/jobs/${jobId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        userId,
        jobId,
        form,
      }),
    },
  );

  return response.json();
}

export const getJobs = async ({
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
      `${baseUrl}/api/employers/${userId}/jobs?${searchParams.toString()}`,
      {
        credentials: "include", // ✅ Ensures cookies are sent
      },
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getJobsCount = async (userId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/employers/${userId}/jobs/count`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getJob = async (userId: string, jobId: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/employers/${userId}/jobs/${jobId}`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteJob = async (userId: string, jobId: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/employers/${userId}/jobs/${jobId}`,
      {
        method: "DELETE",
      },
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
