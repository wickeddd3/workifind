import { baseUrl } from "@/lib/baseUrl";

export const findCompanyBySlug = async (slug: string) => {
  const response = await fetch(`${baseUrl}/api/companies/${slug}`);
  const data = await response.json();

  if (data?.error) return null;

  return {
    ...data,
    perks: data?.perks?.map((item: string) => JSON.parse(item)),
  };
};
