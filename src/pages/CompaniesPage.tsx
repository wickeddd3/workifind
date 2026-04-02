import CompanyFilter from "@/components/companies/CompanyFilter";
import { SuggestedCompanies } from "@/widgets/companies-carousel";
import { CompanySearchTip } from "@/widgets/search-tip-section";

export async function CompaniesPage() {
  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <CompanyFilter />
      <SuggestedCompanies />
      <CompanySearchTip />
    </main>
  );
}
