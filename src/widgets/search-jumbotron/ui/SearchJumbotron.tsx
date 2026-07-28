import { SearchIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export function SearchJumbotron({
  title,
  subtitle,
  placeholder,
  searchAction,
}: {
  title: string;
  subtitle: string;
  placeholder: string;
  searchAction: (formData: FormData) => Promise<void>;
}) {
  // The illustration that sat to the right of this was the same question mark
  // the empty-state uses — beside "Discover companies worth working for" it
  // read as confusion rather than search. Dropped rather than replaced: the
  // banner is a search field, and it does not need a picture of one.
  return (
    <section className="flex w-full items-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card px-4 py-6 shadow-card md:px-6 md:py-8 lg:px-8 lg:py-10">
      <div className="flex w-full grow flex-col gap-4">
        <div className="space-y-2">
          <h1 className="text-balance text-xl font-semibold tracking-tight text-foreground md:text-2xl lg:text-3xl">
            {title}
          </h1>
          <p className="text-balance text-md font-medium text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        </div>
        <form
          action={searchAction}
          key="form-filter"
          className="flex w-full max-w-2xl flex-col gap-2 sm:flex-row sm:items-center"
        >
          <div className="relative w-full">
            <SearchIcon
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="q"
              name="q"
              type="text"
              placeholder={placeholder}
              className="text-base h-12 w-full rounded-xl pl-11"
            />
          </div>
          <Button className="h-12 shrink-0 gap-2 rounded-xl px-6">
            <SearchIcon size={18} aria-hidden="true" />
            <span className="font-semibold">Search</span>
          </Button>
        </form>
      </div>
    </section>
  );
}
