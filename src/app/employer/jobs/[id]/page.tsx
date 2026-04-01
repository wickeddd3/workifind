import { EmployerJobPage } from "@/pages/EmployerJobPage";

export default async function Page({
  params: { id },
}: {
  params: { id: number };
}) {
  return <EmployerJobPage id={id} />;
}
