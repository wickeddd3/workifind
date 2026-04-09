"use server";

import { redirect } from "next/navigation";

export async function formSearchProfessionals(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const q = values.q as string;
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/professionals/search?${searchParams.toString()}`);
}
