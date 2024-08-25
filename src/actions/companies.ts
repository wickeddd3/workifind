import { baseUrl } from "@/lib/baseUrl";

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

export async function searchCompanies({
  query,
  take,
  skip,
}: {
  query: string;
  take: number;
  skip: number;
}) {
  const params = {
    q: query?.toString() || "",
    take: take?.toString() ?? "10",
    skip: skip?.toString() ?? "0",
  };
  const queryParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/companies/search?${queryParams}`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { companies } = responseBody;
    return companies;
  }

  return null;
}

export async function getCompany(slug: string) {
  const response = await fetch(`${baseUrl}/api/companies/${slug}`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { company } = responseBody;

    return {
      ...company,
      perks: company?.perks.map((item: string) => JSON.parse(item)),
    };
  }

  return null;
}
