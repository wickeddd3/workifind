import type { Metadata } from "next";

import { ProfessionalPage } from "@/views/professional";

// Readable by anyone with the link, but deliberately still not indexed. Those
// are different questions: the page redacts a signed-out visitor down to the
// professional substance, and none of that is a reason to have a candidate's
// profile aggregated into search results they did not ask to appear in.
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
