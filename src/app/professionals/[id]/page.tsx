import { ProfessionalPage } from "@/pages-component/ProfessionalPage";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ProfessionalPage id={id} />;
}
