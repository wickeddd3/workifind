import { JobApplicationPage } from "@/pages/JobApplicationPage";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <JobApplicationPage slug={slug} />;
}
