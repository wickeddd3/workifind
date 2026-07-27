import { EmployerJobPage } from "@/views/employer-job";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <EmployerJobPage id={parseInt(id)} />;
}
