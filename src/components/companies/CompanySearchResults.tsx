import CompanySearchResultItem from "@/components/companies/CompanySearchResultItem";

export default function CompanySearchResults() {
  return (
    <div className="flex flex-col space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <CompanySearchResultItem key={index} />
      ))}
    </div>
  );
}
