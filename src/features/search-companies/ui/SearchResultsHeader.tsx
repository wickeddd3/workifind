import type { CompanySearchParams } from "../lib/company-search-url";
import { CompanySortSelect } from "./CompanySortSelect";

export function SearchResultsHeader({
  totalResults,
  searchParams,
}: {
  totalResults: number;
  searchParams: CompanySearchParams;
}) {
  const formattedTotal = new Intl.NumberFormat("en-US").format(totalResults);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="tabular font-semibold text-foreground">
          {formattedTotal}
        </span>{" "}
        {totalResults === 1 ? "company" : "companies"}
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
      <CompanySortSelect searchParams={searchParams} />
    </div>
  );
}
