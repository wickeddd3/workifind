import { CompanySearchPage } from "@/views/company-search";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <CompanySearchPage searchParams={searchParams} />;
}
