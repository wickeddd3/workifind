import { CompanySearchPage } from "@/pages/CompanySearchPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <CompanySearchPage searchParams={searchParams} />;
}
