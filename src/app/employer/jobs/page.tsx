import { EmployerJobsPage } from "@/pages/EmployerJobsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <EmployerJobsPage searchParams={searchParams} />;
}
