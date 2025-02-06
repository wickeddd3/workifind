import { baseUrl } from "@/config/base-url";

export const getInitialProfessionalList = async (initialNumber?: number) => {
  const params = {
    size: initialNumber?.toString() || "",
  };
  const queryParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/professionals/initial?${queryParams}`,
  );

  return await response.json();
};

export const searchProfessionals = async ({
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
    `${baseUrl}/api/professionals/search?${searchParams}`,
  );

  return response.json();
};

export const searchProfessionalsCount = async ({
  searchQuery,
}: {
  searchQuery: string;
}) => {
  const params = {
    searchQuery: searchQuery?.toString() || "",
  };
  const searchParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/professionals/search/count?${searchParams}`,
  );

  return response.json();
};
