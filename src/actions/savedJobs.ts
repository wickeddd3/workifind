"use server";

import { baseUrl } from "@/lib/baseUrl";

export async function getApplicantSavedJobs({
  id,
  take,
  skip,
}: {
  id: number;
  take: number;
  skip: number;
}) {
  const params = {
    take: take?.toString() ?? "5",
    skip: skip?.toString() ?? "0",
  };
  const queryParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/jobs/applicant/${id}/saved?${queryParams}`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { savedJobs } = responseBody;

    return savedJobs;
  }

  return null;
}

export async function getApplicantSavedJobsCount(id: number) {
  const response = await fetch(
    `${baseUrl}/api/jobs/applicant/${id}/saved/count`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { savedJobsCount } = responseBody;
    return savedJobsCount;
  }

  return null;
}

export async function getApplicantInitialSavedJobs(id: number) {
  const response = await fetch(
    `${baseUrl}/api/jobs/applicant/${id}/saved/initial`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { savedJobs } = responseBody;

    return savedJobs;
  }

  return null;
}
