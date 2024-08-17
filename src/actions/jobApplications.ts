import { baseUrl } from "@/lib/baseUrl";

export async function getApplicantJobApplications(id: number) {
  const response = await fetch(
    `${baseUrl}/api/jobs/applicant/${id}/applications`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { jobApplications } = responseBody;

    return jobApplications;
  }

  return null;
}
