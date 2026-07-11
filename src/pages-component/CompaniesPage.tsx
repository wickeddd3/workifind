import { searchCompaniesAction } from "@/features/employer/search-companies";
import { SuggestedCompanies } from "@/widgets/companies-carousel/ui/SuggestedCompanies";
import { SearchJumbotron } from "@/widgets/search-jumbotron";
import { CompanySearchTip } from "@/widgets/search-tip-section";

export async function CompaniesPage() {
  return (
    <div className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <SearchJumbotron
        title="Discover companies worth working for"
        subtitle="Browse employers who are hiring right now."
        placeholder="Search by company name"
        searchAction={searchCompaniesAction}
      />
      <SuggestedCompanies />
      <CompanySearchTip />
    </div>
  );
}
