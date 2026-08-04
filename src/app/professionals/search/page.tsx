import type { Metadata } from "next";

import { ProfessionalSearchPage } from "@/views/professional-search";

// Not indexed, matching the directory and the profiles it lists — see the note
// on `/professionals/page.tsx`.
export const metadata: Metadata = {
  title: "Search professionals",
  description:
    "Search professionals by profession, location, availability, and work preferences.",
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ProfessionalSearchPage searchParams={searchParams} />;
}
