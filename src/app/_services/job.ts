import { baseUrl } from "@/lib/baseUrl";

export const findJobBySlug = async (slug: string) => {
  const response = await fetch(`${baseUrl}/api/jobs/${slug}`);
  return response.json();
};
