"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import useSearchHistory from "@/hooks/useSearchHistory";
import { jobSalary, locationTypes, employmentTypes } from "@/lib/job-types";
import { JobFilterValues } from "@/lib/validation";
import { filterJobs } from "@/actions/search";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

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
    <aside className="mx-auto flex h-full w-full max-w-7xl flex-col gap-6 px-4 pt-6 lg:py-12">
      <h6 className="text-lg font-bold text-indigo-600 md:text-xl lg:text-2xl">
        Find the best jobs in workifind
      </h6>
      <div className="h-full w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 p-[3px]">
        <form
          action={handleFilterJobs}
          key={JSON.stringify(defaultValues)}
          className="h-full w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="w-full space-y-4">
            <div className="grid w-full grid-cols-1 items-end gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <div className="col-span-2 flex w-full flex-col gap-3 sm:col-span-1">
                <Label
                  htmlFor="employmentType"
                  className="font-medium text-gray-500"
                >
                  Job type
                </Label>
                <Select
                  id="employmentType"
                  name="employmentType"
                  className="h-10 w-full pr-12 text-sm"
                  defaultValue={defaultValues.employmentType || ""}
                >
                  <option value="">Select job type</option>
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="col-span-2 flex w-full flex-col gap-3 sm:col-span-1">
                <Label htmlFor="salary" className="font-medium text-gray-500">
                  Job salary
                </Label>
                <Select
                  id="salary"
                  name="salary"
                  className="h-10 w-full pr-12 text-sm"
                  defaultValue={defaultValues.salary || ""}
                >
                  <option value="">Select job salary</option>
                  {jobSalary.map((salary) => (
                    <option key={salary.value} value={salary.value}>
                      {salary.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="col-span-2 flex w-full flex-col gap-3 sm:col-span-1">
                <Label
                  htmlFor="locationType"
                  className="font-medium text-gray-500"
                >
                  Location type
                </Label>
                <Select
                  id="locationType"
                  name="locationType"
                  className="h-10 w-full pr-12 text-sm"
                  defaultValue={defaultValues.locationType || ""}
                >
                  <option value="">Select location type</option>
                  {locationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="col-span-2 flex w-full flex-col gap-3 sm:col-span-1 md:col-span-2 lg:col-span-1">
                <Label htmlFor="q" className="font-medium text-gray-500">
                  Keywords
                </Label>
                <Input
                  id="q"
                  name="q"
                  placeholder="Search by job title"
                  className="w-full text-sm placeholder:text-sm placeholder:text-gray-900"
                  defaultValue={defaultValues.q}
                />
              </div>
              <Button className="col-span-2 mt-3 flex w-full items-center gap-2 rounded-full bg-emerald-500 shadow-sm hover:bg-emerald-600 md:col-span-1 md:my-0">
                <SearchIcon size={18} color="#ffffff" strokeWidth={3} />
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  Search
                </span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
}
