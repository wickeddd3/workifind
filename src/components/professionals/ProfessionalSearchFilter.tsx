import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  professionalFilterSchema,
  ProfessionalFilterValues,
} from "@/lib/validation";

async function searchProfessionals(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q } = professionalFilterSchema.parse(values);
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/professionals/search?${searchParams.toString()}`);
}

interface ProfessionalSearchFilterProps {
  filterValues: ProfessionalFilterValues;
}

export default function ProfessionalSearchFilter({
  filterValues,
}: ProfessionalSearchFilterProps) {
  const { q } = filterValues;

  return (
    <section className="flex flex-col space-y-8 py-6">
      <h1 className="text-3xl font-medium">
        Search results for &quot;{q}&ldquo;
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
          placeholder="Search by company name"
          className="w-full"
          defaultValue={q}
        />
        <Button className="bg-[#3366FF] hover:bg-[#254EDB]">Search</Button>
      </form>
    </section>
  );
}
