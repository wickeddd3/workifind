import { SearchIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { searchProfessionalsAction } from "../api/professional.action";

export function SearchField({ query }: { query: string }) {
  return (
    <section className="flex flex-col gap-6 py-6">
      <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
        {query ? (
          <>Results for &ldquo;{query}&rdquo;</>
        ) : (
          "Search professionals"
        )}
      </h1>
      <form
        action={searchProfessionalsAction}
        key="professional-search-filter"
        className="flex w-full flex-col gap-2 sm:flex-row sm:items-center"
      >
        <div className="relative w-full">
          <SearchIcon
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <Input
            id="q"
            name="q"
            type="text"
            placeholder="Search by profession"
            className="text-base h-12 w-full rounded-xl pl-11"
            defaultValue={query}
          />
        </div>
        <Button className="h-12 shrink-0 gap-2 rounded-xl px-6">
          <SearchIcon size={18} aria-hidden="true" />
          <span className="font-semibold">Search</span>
        </Button>
      </form>
    </section>
  );
}
