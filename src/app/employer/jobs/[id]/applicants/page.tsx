import { EmployerJobApplicants } from "@/views/employer-job-applicants";

export default async function Page({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string>;
}) {
  return (
    <EmployerJobApplicants id={parseInt(id)} searchParams={searchParams} />
  );
}
