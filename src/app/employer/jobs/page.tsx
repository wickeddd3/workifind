import { EmployerJobsPage } from "@/pages-component/EmployerJobsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <EmployerJobsPage searchParams={searchParams} />;
}
