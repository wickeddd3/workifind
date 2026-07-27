import { ApplicantSavedJobsPage } from "@/views/applicant-saved-jobs";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ApplicantSavedJobsPage searchParams={searchParams} />;
}
