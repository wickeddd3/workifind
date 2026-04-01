import { ProfessionalPage } from "@/pages/ProfessionalPage";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ProfessionalPage id={id} />;
}
