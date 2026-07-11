import type { Metadata } from "next";

import { ProfessionalsPage } from "@/pages-component/ProfessionalsPage";

// Candidate directory is kept out of the index to protect personal data.
export const metadata: Metadata = {
  title: "Find professionals",
  description: "Browse skilled professionals ready for their next role.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  return <ProfessionalsPage />;
}
