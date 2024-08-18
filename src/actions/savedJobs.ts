import { baseUrl } from "@/lib/baseUrl";

export async function getApplicantSavedJobs(id: number) {
  const response = await fetch(`${baseUrl}/api/jobs/applicant/${id}/saved`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { savedJobs } = responseBody;

    return savedJobs;
  }

  return null;
}
