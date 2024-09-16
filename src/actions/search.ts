"use server";

import { jobFilterSchema } from "@/lib/validation";

export async function filterJobs(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { q, employmentType, salary, locationType } =
    jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(employmentType && { employmentType }),
    ...(salary && { salary }),
    ...(locationType && { locationType }),
  });

  const searchFilter = `/jobs?${searchParams.toString()}`;
  const searchTitle = q?.trim();

  return { searchFilter, searchTitle };
}
