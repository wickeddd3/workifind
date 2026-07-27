import { EmployerJobApplicants } from "@/views/employer-job-applicants";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <EmployerJobApplicants id={parseInt(id)} />;
}
