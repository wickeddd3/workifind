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
    <main className="m-auto mb-10 flex h-full min-h-screen max-w-2xl flex-col gap-6 px-3">
      <ProfessionalSearchFilter filterValues={filterValues} />
      <ProfessionalSearchResults
        filterValues={filterValues}
        page={page ? parseInt(page) : undefined}
      />
    </main>
  );
}
