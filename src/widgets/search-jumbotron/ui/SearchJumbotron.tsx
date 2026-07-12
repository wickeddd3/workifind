import { SearchIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import IconSearch from "@/shared/ui/icons/IconSearch";
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
  return (
    <section className="flex h-full w-full items-center justify-between rounded-2xl border border-indigo-100/70 bg-gradient-to-br from-indigo-50 via-white to-white px-4 py-6 shadow-card md:px-6 md:py-8 lg:px-8 lg:py-10">
      <div className="flex w-full grow flex-col gap-4">
        <div className="space-y-2">
          <h1 className="text-balance text-xl font-semibold tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
            {title}
          </h1>
          <p className="text-balance text-md font-medium text-gray-600 md:text-lg">
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
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
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
      <div className="hidden shrink-0 items-center justify-center pl-8 md:flex lg:pl-14">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-44 w-44 rounded-full bg-indigo-200/50 blur-2xl"></div>
          <IconSearch width={220} height={220} className="relative z-10" />
        </div>
      </div>
    </section>
  );
}
