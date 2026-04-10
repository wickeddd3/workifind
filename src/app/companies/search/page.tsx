import { CompanySearchPage } from "@/pages-component/CompanySearchPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <CompanySearchPage searchParams={searchParams} />;
}
