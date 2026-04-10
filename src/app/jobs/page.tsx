import { JobsPage } from "@/pages-component/JobsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <JobsPage searchParams={searchParams} />;
}
