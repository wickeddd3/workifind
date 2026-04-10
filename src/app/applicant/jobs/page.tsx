import { ApplicantJobsPage } from "@/pages-component/ApplicantJobsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ApplicantJobsPage searchParams={searchParams} />;
}
