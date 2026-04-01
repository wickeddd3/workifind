import { ApplicantSavedJobsPage } from "@/pages/ApplicantSavedJobsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ApplicantSavedJobsPage searchParams={searchParams} />;
}
