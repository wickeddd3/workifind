import type { Metadata } from "next";

import { ProfessionalsPage } from "@/views/professionals";

// Open to every visitor, but still not indexed — see the note on the profile
// page. Flip `robots` here and on `[id]` together if the directory is ever
// meant to be an SEO surface; splitting them would index a listing whose
// entries are all noindex.
export const metadata: Metadata = {
  title: "Find professionals",
  description: "Browse skilled professionals ready for their next role.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  return <ProfessionalsPage />;
}
