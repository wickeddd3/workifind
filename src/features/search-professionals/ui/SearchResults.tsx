import { profileVisibility, resolveProfileViewer } from "@/entities/applicant";
import type { UserRole } from "@/shared/lib/clerk.server";

import type { ProfessionalSummaryRow } from "../api/professional.service";
import {
  buildProfessionalsUrl,
  type ProfessionalSearchParams,
} from "../lib/professional-search-url";
import { ProfessionalCardLink } from "./ProfessionalCardLink";
import { SearchResultItem } from "./SearchResultItem";

export function SearchResults({
  professionals,
  searchParams,
  page,
  viewerUserId,
  viewerRole,
}: {
  professionals: ProfessionalSummaryRow[];
  searchParams: ProfessionalSearchParams;
  page?: number;
  viewerUserId?: string;
  viewerRole?: UserRole;
}) {
  const { professional: selectedId } = searchParams;

  /** The current filter state, with `professional` swapped to the previewed one. */
  function getPreviewUrl(id: string): string {
    return buildProfessionalsUrl(searchParams, {
      professional: id,
      page: page?.toString(),
    });
  }

  // A list of results is a list: it gives assistive tech the item count and
  // lets users jump between rows.
  return (
    <ul className="flex flex-col gap-3">
      {professionals.map((professional) => (
        <li key={professional.id}>
          <ProfessionalCardLink
            href={`/professionals/${professional.id}`}
            previewHref={getPreviewUrl(professional.id)}
            isSelected={professional.id === selectedId}
          >
            <SearchResultItem
              professional={professional}
              isSelected={professional.id === selectedId}
              // Resolved per row rather than once for the list: an applicant
              // browsing the directory can appear in their own results, and the
              // owner tier is what keeps their own figure visible to them.
              canSeeSalary={
                profileVisibility(
                  resolveProfileViewer({
                    ownerUserId: professional.userId,
                    viewerUserId,
                    viewerRole,
                  }),
                ).salary
              }
            />
          </ProfessionalCardLink>
        </li>
      ))}
    </ul>
  );
}
