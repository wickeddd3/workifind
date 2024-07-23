export async function getEmployer(id: number) {
  const response = await fetch(`/api/employers/${id}`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { employer } = responseBody;

    return employer;
  }

  return null;
}
