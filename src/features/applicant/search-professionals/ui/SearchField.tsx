import { redirect } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { ProfessionalFilterSchema } from "./../model/schema";

async function searchProfessionals(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q } = ProfessionalFilterSchema.parse(values);
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/professionals/search?${searchParams.toString()}`);
}

export function SearchField({ query }: { query: string }) {
  return (
    <section className="flex flex-col space-y-8 py-6">
      <h1 className="text-xl font-medium text-gray-900 md:text-2xl">
        Search results for &quot;{query}&ldquo;
      </h1>
      <form
        action={searchProfessionals}
        key="company-search-filter"
        className="flex w-full gap-2"
      >
        <Input
          id="q"
          name="q"
          type="text"
          placeholder="Search by profession"
          className="w-full"
          defaultValue={query}
        />
        <Button className="bg-indigo-600 hover:bg-indigo-700">Search</Button>
      </form>
    </section>
  );
}
