import { baseUrl } from "@/actions/baseUrl";

export async function getInitialCompanies(initialNumber?: number | string) {
  const params = {
    take: initialNumber?.toString() || "",
  };
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(
    `${baseUrl}/api/companies/initial?${queryParams}`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { companies } = responseBody;
    return companies;
  }

  return null;
}
