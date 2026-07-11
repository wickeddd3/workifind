import type { Metadata } from "next";

import { ProfessionalPage } from "@/pages-component/ProfessionalPage";

// Candidate profiles carry personal data, so they are intentionally kept out
// of the search index (see the SEO indexing decision).
export const metadata: Metadata = {
  title: "Professional profile",
  robots: { index: false, follow: false },
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ProfessionalPage id={id} />;
}
