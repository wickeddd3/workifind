import Link from "next/link";

import { type Company } from "@/entities/employer";

import { SearchResultItem } from "./SearchResultItem";

export function SearchResults({ companies }: { companies: Company[] }) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      {companies.map((company) => (
        <Link
          href={`/companies/${company.slug}`}
          key={company.slug}
          className="block"
        >
          <SearchResultItem company={company} />
        </Link>
      ))}
    </div>
  );
}
