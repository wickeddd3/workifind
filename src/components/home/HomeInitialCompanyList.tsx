import CompanyInitialList from "@/components/companies/CompanyInitialList";
import { cache } from "react";
import { getInitialCompanyList } from "@/app/_services/companies";

const handleGetInitialCompanyList = cache(async () => {
  return await getInitialCompanyList();
});

export default async function HomeInitialCompanyList() {
  const companies = await handleGetInitialCompanyList();

  return (
    companies && (
      <CompanyInitialList companies={companies} hasSeeMoreButton={true} />
    )
  );
}
