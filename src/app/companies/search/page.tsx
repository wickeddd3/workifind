import CompanySearchFilter from "@/components/companies/CompanySearchFilter";
import CompanySearchResults from "@/components/companies/CompanySearchResults";
import { CompanyFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default function Page({ searchParams: { q, page } }: PageProps) {
  const filterValues: CompanyFilterValues = {
    q,
  };

  return (
    <main className="m-auto mb-10 flex h-full min-h-screen max-w-2xl flex-col gap-6 px-3">
      <CompanySearchFilter filterValues={filterValues} />
      <CompanySearchResults
        filterValues={filterValues}
        page={page ? parseInt(page) : undefined}
      />
    </main>
  );
}
