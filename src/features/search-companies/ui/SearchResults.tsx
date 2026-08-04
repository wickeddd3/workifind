import { type Company } from "@/entities/employer";

import {
  buildCompaniesUrl,
  type CompanySearchParams,
} from "../lib/company-search-url";
import { CompanyCardLink } from "./CompanyCardLink";
import { SearchResultItem } from "./SearchResultItem";

export function SearchResults({
  companies,
  searchParams,
  page,
}: {
  companies: Company[];
  searchParams: CompanySearchParams;
  page?: number;
}) {
  const { company: selectedSlug } = searchParams;

  /** The current filter state, with `company` swapped to the previewed one. */
  function getPreviewUrl(slug: string): string {
    return buildCompaniesUrl(searchParams, {
      company: slug,
      page: page?.toString(),
    });
  }

  // A list of results is a list: it gives assistive tech the item count and
  // lets users jump between rows.
  return (
    <ul className="flex flex-col gap-3">
      {companies.map((company) => (
        <li key={company.slug}>
          <CompanyCardLink
            href={`/companies/${company.slug}`}
            previewHref={getPreviewUrl(company.slug)}
            isSelected={company.slug === selectedSlug}
          >
            <SearchResultItem
              company={company}
              isSelected={company.slug === selectedSlug}
            />
          </CompanyCardLink>
        </li>
      ))}
    </ul>
  );
}
