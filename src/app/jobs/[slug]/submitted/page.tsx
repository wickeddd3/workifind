import { JobApplicationSubmittedPage } from "@/views/job-submitted";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <JobApplicationSubmittedPage slug={slug} />;
}
