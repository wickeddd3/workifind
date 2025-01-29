import CompanyFilter from "@/components/companies/CompanyFilter";
import CompanyInitialList from "@/components/companies/CompanyInitialList";
import CompanySearchTip from "@/components/companies/CompanySearchTip";
import { cache } from "react";
import { getInitialCompanyList } from "@/app/_services/companies";

const handleGetInitialCompanyList = cache(async () => {
  return await getInitialCompanyList();
});

export default async function Page() {
  const companies = await handleGetInitialCompanyList();

  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <CompanyFilter />
      {companies && <CompanyInitialList companies={companies} />}
      <CompanySearchTip />
    </main>
  );
}
