"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import useSearchHistory from "@/hooks/useSearchHistory";
import { jobSalary, locationTypes, employmentTypes } from "@/lib/job-types";
import { JobFilterValues } from "@/lib/validation";
import { filterJobs } from "@/actions/search";
import { useRouter } from "next/navigation";

interface JobFilterProps {
  defaultValues: JobFilterValues;
}

export default function JobFilter({ defaultValues }: JobFilterProps) {
  const router = useRouter();

  const { saveSearchFilter } = useSearchHistory({
    localStorageName: "workifind.search-history",
  });

  async function handleFilterJobs(formData: FormData) {
    const { searchFilter, searchTitle } = await filterJobs(formData);
    router.push(searchFilter);
    saveSearchFilter({ searchFilter, searchTitle });
  }

  return (
    <aside className="bg-gray-50 bg-custom-job-filter-svg bg-cover bg-center bg-no-repeat px-3 py-14 md:w-full">
      <div className="mx-auto max-w-4xl">
        <form
          action={handleFilterJobs}
          key={JSON.stringify(defaultValues)}
          className="w-full"
        >
          <div className="w-full space-y-4">
            <div className="flex w-full gap-2">
              <Input
                id="q"
                name="q"
                placeholder="Search by job title"
                className="w-full px-4 py-6 text-md"
                defaultValue={defaultValues.q}
              />
              <Button className="size-30 bg-[#3366FF] text-sm font-semibold tracking-wider hover:bg-[#254EDB]">
                Search
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select
                id="employmentType"
                name="employmentType"
                className="h-12 w-full rounded-full px-4 text-md md:w-[200px]"
                defaultValue={defaultValues.employmentType || ""}
              >
                <option value="">Job types</option>
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              <Select
                id="salary"
                name="salary"
                className="h-12 w-full rounded-full px-4 text-md md:w-[200px]"
                defaultValue={defaultValues.salary || ""}
              >
                <option value="">Job salary</option>
                {jobSalary.map((salary) => (
                  <option key={salary.value} value={salary.value}>
                    {salary.name}
                  </option>
                ))}
              </Select>
              <Select
                id="locationType"
                name="locationType"
                className="h-12 w-full rounded-full px-4 text-md md:w-[200px]"
                defaultValue={defaultValues.locationType || ""}
              >
                <option value="">Location type</option>
                {locationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
}
