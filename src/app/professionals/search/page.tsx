import ProfessionalSearchFilter from "@/components/professionals/ProfessionalSearchFilter";
import ProfessionalSearchResults from "@/components/professionals/ProfessionalSearchResults";
import { ProfessionalFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default function Page({ searchParams: { q, page } }: PageProps) {
  const filterValues: ProfessionalFilterValues = {
    q,
  };

  return (
    <main className="m-auto mb-10 max-w-2xl space-y-6">
      <ProfessionalSearchFilter filterValues={filterValues} />
      <ProfessionalSearchResults
        filterValues={filterValues}
        page={page ? parseInt(page) : undefined}
      />
    </main>
  );
}
