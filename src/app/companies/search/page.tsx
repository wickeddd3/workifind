import CompanySearchFilter from "@/components/companies/CompanySearchFilter";
import CompanySearchResults from "@/components/companies/CompanySearchResults";
import { CompanyFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
  };
}

export default function Page({ searchParams: { q } }: PageProps) {
  const filterValues: CompanyFilterValues = {
    q,
  };

  return (
    <main className="m-auto mb-10 max-w-2xl space-y-6">
      <CompanySearchFilter filterValues={filterValues} />
      <CompanySearchResults filterValues={filterValues} />
    </main>
  );
}
