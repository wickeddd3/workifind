import { baseUrl } from "@/lib/baseUrl";

export const findProfessionalById = async (id: number) => {
  const response = await fetch(`${baseUrl}/api/professionals/${id}`);
  const data = await response.json();

  if (data?.error) return null;

  return {
    ...data,
    skills: data?.skills?.map((item: string) => JSON.parse(item)),
    languages: data?.languages?.map((item: string) => JSON.parse(item)),
    preferredLocations: data?.preferredLocations?.map((item: string) =>
      JSON.parse(item),
    ),
  };
};
