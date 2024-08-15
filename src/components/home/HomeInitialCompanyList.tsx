import { getInitialCompanies } from "@/actions/companies";
import CompanyInitialList from "@/components/companies/CompanyInitialList";

export default async function HomeInitialCompanyList() {
  const companies = await getInitialCompanies();

  return (
    companies && (
      <CompanyInitialList companies={companies} hasSeeMoreButton={true} />
    )
  );
}
