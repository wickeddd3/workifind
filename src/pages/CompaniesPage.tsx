import CompanyFilter from "@/components/companies/CompanyFilter";
import CompanyInitialList from "@/components/companies/CompanyInitialList";
import { cache } from "react";
import { getInitialCompanyList } from "@/app/_services/companies";
import { CompanySearchTip } from "@/widgets/search-tip-section";

const handleGetInitialCompanyList = cache(async () => {
  return await getInitialCompanyList();
});

export async function CompaniesPage() {
  const companies = await handleGetInitialCompanyList();

  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <CompanyFilter />
      {companies && <CompanyInitialList companies={companies} />}
      <CompanySearchTip />
    </main>
  );
}
