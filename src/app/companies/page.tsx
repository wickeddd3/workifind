import { getInitialCompanies } from "@/actions/companies";
import CompanyFilter from "@/components/companies/CompanyFilter";
import CompanyInitialList from "@/components/companies/CompanyInitialList";
import CompanySearchTip from "@/components/companies/CompanySearchTip";

export default async function Page() {
  const companies = await getInitialCompanies();

  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <CompanyFilter />
      {companies && <CompanyInitialList companies={companies} />}
      <CompanySearchTip />
    </main>
  );
}
