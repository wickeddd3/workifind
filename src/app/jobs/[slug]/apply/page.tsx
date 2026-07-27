import { JobApplicationPage } from "@/views/job-apply";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <JobApplicationPage slug={slug} />;
}
