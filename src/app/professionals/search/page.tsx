import { ProfessionalSearchPage } from "@/pages/ProfessionalSearchPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ProfessionalSearchPage searchParams={searchParams} />;
}
