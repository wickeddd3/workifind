import { baseUrl } from "@/lib/baseUrl";

export async function getInitialProfessionals(initialNumber?: number | string) {
  const params = {
    take: initialNumber?.toString() || "",
  };
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(
    `${baseUrl}/api/professionals/initial?${queryParams}`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { professionals } = responseBody;
    return professionals;
  }

  return null;
}

export async function searchProfessionals({
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
    `${baseUrl}/api/professionals/search?${queryParams}`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { professionals } = responseBody;
    return professionals;
  }

  return null;
}

export async function searchProfessionalsCount(q: string) {
  const params = {
    q: q?.toString() || "",
  };
  const queryParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/professionals/search/count?${queryParams}`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { professionalsCount } = responseBody;
    return professionalsCount;
  }

  return null;
}

export async function getProfessional(id: number) {
  const response = await fetch(`${baseUrl}/api/professionals/${id}`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { professional } = responseBody;

    return {
      ...professional,
      skills: professional?.skills.map((item: string) => JSON.parse(item)),
      languages: professional?.languages.map((item: string) =>
        JSON.parse(item),
      ),
      preferredLocations: professional?.preferredLocations.map((item: string) =>
        JSON.parse(item),
      ),
    };
  }

  return null;
}
