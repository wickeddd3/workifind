import { EmployerJobsPage } from "@/views/employer-jobs";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <EmployerJobsPage searchParams={searchParams} />;
}
