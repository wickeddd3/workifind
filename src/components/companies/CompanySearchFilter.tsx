import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CompanyFilterSchema,
  CompanyFilterSchemaType,
} from "@/schema/company-filter";

async function searchCompanies(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q } = CompanyFilterSchema.parse(values);
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/companies/search?${searchParams.toString()}`);
}

interface CompanySearchFilterProps {
  filterValues: CompanyFilterSchemaType;
}

export default function CompanySearchFilter({
  filterValues,
}: CompanySearchFilterProps) {
  const { q } = filterValues;

  return (
    <section className="flex flex-col space-y-8 py-6">
      <h1 className="text-xl font-medium text-gray-900 md:text-2xl">
        Search results for &quot;{q}&ldquo;
      </h1>
      <form
        action={searchCompanies}
        key="company-search-filter"
        className="flex w-full gap-2"
      >
        <Input
          id="q"
          name="q"
          type="text"
          placeholder="Search by company name"
          className="w-full"
          defaultValue={q}
        />
        <Button className="bg-indigo-600 hover:bg-indigo-700">Search</Button>
      </form>
    </section>
  );
}
