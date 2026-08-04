import type { ProfessionalSearchParams } from "../lib/professional-search-url";
import { ProfessionalSortSelect } from "./ProfessionalSortSelect";

export function SearchResultsHeader({
  totalResults,
  searchParams,
}: {
  totalResults: number;
  searchParams: ProfessionalSearchParams;
}) {
  const formattedTotal = new Intl.NumberFormat("en-US").format(totalResults);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="tabular font-semibold text-foreground">
          {formattedTotal}
        </span>{" "}
        {totalResults === 1 ? "professional" : "professionals"}
        {searchParams.q && (
          <>
            {" "}
            for{" "}
            <span className="font-medium text-foreground">
              {searchParams.q}
            </span>
          </>
        )}
      </p>
      <ProfessionalSortSelect searchParams={searchParams} />
    </div>
  );
}
