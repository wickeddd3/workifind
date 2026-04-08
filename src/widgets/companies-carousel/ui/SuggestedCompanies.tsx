import { getSuggestedCompanies } from "@/entities/employer";
import { CompaniesCarousel } from "./CompaniesCarousel";
import { ViewMoreButton } from "@/shared/ui/ViewMoreButton";

export async function SuggestedCompanies({
  hasSeeMoreButton = false,
}: {
  hasSeeMoreButton?: boolean;
}) {
  const companies = await getSuggestedCompanies(8);

  return (
    <section className="flex w-full flex-col space-y-2 py-2 md:py-4">
      <h1 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
        Explore companies
      </h1>
      <h5 className="text-sm font-normal text-gray-700 md:text-md">
        Learn about new jobs and company culture.
      </h5>
      <div className="flex gap-4 py-2">
        <CompaniesCarousel companies={companies} />
      </div>
      {hasSeeMoreButton && (
        <ViewMoreButton text="See more" route="/companies" />
      )}
    </section>
  );
}
