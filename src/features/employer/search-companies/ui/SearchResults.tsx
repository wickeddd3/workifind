import Link from "next/link";
import { SearchResultItem } from "./SearchResultItem";
import { Company } from "@/entities/employer";

export function SearchResults({ companies }: { companies: Company[] }) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      {companies.map((company) => (
        <Link href={`/companies/${company.slug}`} key={company.slug}>
          <SearchResultItem company={company} />
        </Link>
      ))}
    </div>
  );
}
