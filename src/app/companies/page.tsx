import { getInitialCompanies } from "@/actions/companies";
import CompanyFilter from "@/components/companies/CompanyFilter";
import CompanyInitialList from "@/components/companies/CompanyInitialList";
import CompanySearchTip from "@/components/companies/CompanySearchTip";

export default async function Page() {
  const companies = await getInitialCompanies();

  return (
    <main className="m-auto mb-10 max-w-5xl space-y-6">
      <CompanyFilter />
      {companies && <CompanyInitialList companies={companies} />}
      <CompanySearchTip />
    </main>
  );
}
