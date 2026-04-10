import { EmployerJobApplicants } from "@/pages-component/EmployerJobApplicants";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <EmployerJobApplicants id={parseInt(id)} />;
}
