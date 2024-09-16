import dynamic from "next/dynamic";
import HomeJobFilter from "@/components/home/HomeJobFilter";
import { JobFilterValues } from "@/lib/validation";

const DynamicHomeInitialSavedJobs = dynamic(
  () => import("@/components/home/HomeInitialSavedJobs"),
);

const DynamicHomeSearchHistory = dynamic(
  () => import("@/components/home/HomeSearchHistory"),
);

const DynamicHomeInitialCompanyList = dynamic(
  () => import("@/components/home/HomeInitialCompanyList"),
  {
    ssr: false,
  },
);

const DynamicHomeMarketingSection = dynamic(
  () => import("@/components/home/HomeMarketingSection"),
);

export default function Page() {
  const filterValues: JobFilterValues = {
    q: "",
    employmentType: "",
    salary: "",
    locationType: "",
  };

  return (
    <main className="m-auto mb-10 gap-6">
      <HomeJobFilter defaultValues={filterValues} />
      <div className="m-auto flex h-full max-w-7xl flex-wrap items-center gap-2 px-3 md:flex-col">
        <DynamicHomeSearchHistory />
        <DynamicHomeInitialSavedJobs />
        <DynamicHomeInitialCompanyList />
        <DynamicHomeMarketingSection />
      </div>
    </main>
  );
}
