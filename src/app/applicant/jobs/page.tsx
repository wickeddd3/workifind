import { ApplicantJobsPage } from "@/pages/ApplicantJobsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ApplicantJobsPage searchParams={searchParams} />;
}
