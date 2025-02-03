import CompanySearchFilter from "@/components/companies/CompanySearchFilter";
import CompanySearchResults from "@/components/companies/CompanySearchResults";
import CompanySearchEmptyPlaceholder from "@/components/companies/CompanySearchEmptyPlaceholder";
import CompanySearchResultsPagination from "@/components/companies/CompanySearchResultsPagination";
import { CompanyFilterSchemaType } from "@/schema/company-filter";
import {
  searchCompanies,
  searchCompaniesCount,
} from "@/app/_services/companies";

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function Page({ searchParams: { q, page } }: PageProps) {
  const filterValues: CompanyFilterSchemaType = {
    q,
  };
  const jobsPerPage = 10;
  const currentPage = page ? parseInt(page) : 1;
  const query = {
    searchQuery: q ?? "",
  };
  const searchCompaniesQuery = {
    ...query,
    size: jobsPerPage,
    page: currentPage,
  };

  const [companies, totalResults] = await Promise.all([
    searchCompanies(searchCompaniesQuery),
    searchCompaniesCount(query),
  ]);

  const hasCompanies = companies && companies.length > 0;

  return (
    <main className="m-auto mb-10 flex h-full min-h-screen max-w-2xl flex-col gap-6 px-3">
      <CompanySearchFilter filterValues={filterValues} />
      <div className="flex h-full w-full flex-col gap-6">
        {hasCompanies && (
          <>
            <CompanySearchResults companies={companies} />
            <CompanySearchResultsPagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalResults / jobsPerPage)}
              filterValues={filterValues}
            />
          </>
        )}
        {!hasCompanies && <CompanySearchEmptyPlaceholder />}
      </div>
    </main>
  );
}
