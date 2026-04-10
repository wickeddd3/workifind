import { ProfessionalSearchPage } from "@/pages-component/ProfessionalSearchPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ProfessionalSearchPage searchParams={searchParams} />;
}
