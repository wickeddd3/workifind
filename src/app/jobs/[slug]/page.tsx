import { JobPage } from "@/pages-component/JobPage";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <JobPage slug={slug} />;
}
