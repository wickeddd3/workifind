import { EmployerJobPage } from "@/pages-component/EmployerJobPage";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <EmployerJobPage id={parseInt(id)} />;
}
