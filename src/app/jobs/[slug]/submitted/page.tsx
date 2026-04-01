import { JobApplicationSubmittedPage } from "@/pages/JobApplicationSubmittedPage";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <JobApplicationSubmittedPage slug={slug} />;
}
