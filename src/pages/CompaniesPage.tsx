import { searchCompanies, SearchJumbotron } from "@/widgets/search-jumbotron";
import { SuggestedCompanies } from "@/widgets/companies-carousel";
import { CompanySearchTip } from "@/widgets/search-tip-section";
import { redirect } from "next/navigation";

export async function CompaniesPage() {
  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <SearchJumbotron
        title="Find your next potential employer"
        subtitle="Explore list of companies you can work for"
        placeholder="Search by company name"
        searchAction={searchCompanies}
      />
      <SuggestedCompanies />
      <CompanySearchTip />
    </main>
  );
}
