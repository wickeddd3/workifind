import { ProfessionalSearchPage } from "@/views/professional-search";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <ProfessionalSearchPage searchParams={searchParams} />;
}
