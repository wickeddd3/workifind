export async function getApplicant(id: number) {
  const response = await fetch(`/api/applicants/${id}`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { applicant } = responseBody;

    return applicant;
  }

  return null;
}
