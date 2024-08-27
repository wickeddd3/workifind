import { baseUrl } from "@/lib/baseUrl";

export async function getApplicantJobApplications({
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
    `${baseUrl}/api/jobs/applicant/${id}/applications?${queryParams}`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { jobApplications } = responseBody;

    return jobApplications;
  }

  return null;
}

export async function getApplicantJobApplicationsCount(id: number) {
  const response = await fetch(
    `${baseUrl}/api/jobs/applicant/${id}/applications/count`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { jobApplicationsCount } = responseBody;
    return jobApplicationsCount;
  }

  return null;
}
