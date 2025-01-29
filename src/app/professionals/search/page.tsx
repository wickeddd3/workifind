import ProfessionalSearchFilter from "@/components/professionals/ProfessionalSearchFilter";
import ProfessionalSearchResults from "@/components/professionals/ProfessionalSearchResults";
import ProfessionalSearchEmptyPlaceholder from "@/components/professionals/ProfessionalSearchEmptyPlaceholder";
import ProfessionalSearchResultsPagination from "@/components/professionals/ProfessionalSearchResultsPagination";
import { ProfessionalFilterValues } from "@/lib/validation";
import {
  searchProfessionals,
  searchProfessionalsCount,
} from "@/app/_services/professionals";

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function Page({ searchParams: { q, page } }: PageProps) {
  const filterValues: ProfessionalFilterValues = {
    q,
  };
  const jobsPerPage = 10;
  const currentPage = page ? parseInt(page) : 1;
  const query = {
    searchQuery: q ?? "",
  };
  const searchProfessionalsQuery = {
    ...query,
    size: jobsPerPage,
    page: currentPage,
  };

  const [professionals, totalResults] = await Promise.all([
    searchProfessionals(searchProfessionalsQuery),
    searchProfessionalsCount(query),
  ]);

  const hasProfessionals = professionals && professionals.length > 0;

  return (
    <main className="m-auto mb-10 flex h-full min-h-screen max-w-2xl flex-col gap-6 px-3">
      <ProfessionalSearchFilter filterValues={filterValues} />
      <div className="flex h-full w-full flex-col gap-6">
        {hasProfessionals && (
          <>
            <ProfessionalSearchResults professionals={professionals} />
            <ProfessionalSearchResultsPagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalResults / jobsPerPage)}
              filterValues={filterValues}
            />
          </>
        )}
        {!hasProfessionals && <ProfessionalSearchEmptyPlaceholder />}
      </div>
    </main>
  );
}
