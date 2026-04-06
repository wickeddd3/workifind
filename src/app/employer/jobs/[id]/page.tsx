import { EmployerJobPage } from "@/pages/EmployerJobPage";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <EmployerJobPage id={parseInt(id)} />;
}
