import { baseUrl } from "@/lib/baseUrl";

export const getInitialCompanyList = async (initialNumber?: number) => {
  const params = {
    size: initialNumber?.toString() || "",
  };
  const queryParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/companies/initial?${queryParams}`,
  );

  return await response.json();
};

export const searchCompanies = async ({
  searchQuery,
  size,
  page,
}: {
  searchQuery: string;
  size: number;
  page: number;
}) => {
  const params = {
    searchQuery: searchQuery?.toString() || "",
    size: size?.toString() ?? "10",
    page: page?.toString() ?? "1",
  };
  const searchParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/companies/search?${searchParams}`,
  );

  return response.json();
};

export const searchCompaniesCount = async ({
  searchQuery,
}: {
  searchQuery: string;
}) => {
  const params = {
    searchQuery: searchQuery?.toString() || "",
  };
  const searchParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/companies/search/count?${searchParams}`,
  );

  return response.json();
};
