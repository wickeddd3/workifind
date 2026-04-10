import { JobApplicationSubmittedPage } from "@/pages-component/JobApplicationSubmittedPage";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <JobApplicationSubmittedPage slug={slug} />;
}
