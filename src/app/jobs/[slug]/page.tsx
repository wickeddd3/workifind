import { JobPage } from "@/pages/JobPage";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <JobPage slug={slug} />;
}
