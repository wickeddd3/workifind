"use server";

import { redirect } from "next/navigation";

export async function formSearchCompanies(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const q = values.q as string;
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/companies/search?${searchParams.toString()}`);
}
