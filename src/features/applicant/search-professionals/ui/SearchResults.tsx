import type { Applicant } from "@prisma/client";
import Link from "next/link";
import { SearchResultItem } from "./SearchResultItem";

export function SearchResults({
  professionals,
}: {
  professionals: Applicant[];
}) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      {professionals.map((professional) => (
        <Link href={`/professionals/${professional.id}`} key={professional.id}>
          <SearchResultItem professional={professional} />
        </Link>
      ))}
    </div>
  );
}
