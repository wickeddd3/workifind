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

export async function searchProfessionals(q: string) {
  const params = {
    q: q?.toString() || "",
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
