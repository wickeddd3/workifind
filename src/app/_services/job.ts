import { baseUrl } from "@/config/base-url";

export const findJobBySlug = async (slug: string) => {
  const response = await fetch(`${baseUrl}/api/jobs/${slug}`);
  const data = await response.json();

  if (data?.error) return null;

  return data;
};
