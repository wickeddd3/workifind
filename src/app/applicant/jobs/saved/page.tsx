import { ApplicantSavedJobsPage } from "@/pages-component/ApplicantSavedJobsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ApplicantSavedJobsPage searchParams={searchParams} />;
}
