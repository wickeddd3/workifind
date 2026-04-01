import { EmployerJobApplicants } from "@/pages/EmployerJobApplicants";

export default async function Page({
  params: { id },
}: {
  params: { id: number };
}) {
  return <EmployerJobApplicants id={id} />;
}
