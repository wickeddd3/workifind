import dynamic from "next/dynamic";
import HomeJobFilter from "@/components/home/HomeJobFilter";
import { JobFilterSchemaType } from "@/schema/job-filter";

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
  const filterValues: JobFilterSchemaType = {
    q: "",
    employmentType: "",
    salary: "",
    locationType: "",
  };

  return (
    <div className="m-auto mb-10 gap-6" data-testid="home-page">
      <HomeJobFilter defaultValues={filterValues} />
      <div className="m-auto flex h-full max-w-7xl flex-wrap items-center gap-2 px-3 md:flex-col">
        <DynamicHomeSearchHistory />
        <DynamicHomeInitialSavedJobs />
        <DynamicHomeInitialCompanyList />
        <DynamicHomeMarketingSection />
      </div>
    </div>
  );
}
