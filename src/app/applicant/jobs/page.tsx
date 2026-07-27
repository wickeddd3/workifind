import { ApplicantJobsPage } from "@/views/applicant-jobs";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ApplicantJobsPage searchParams={searchParams} />;
}
