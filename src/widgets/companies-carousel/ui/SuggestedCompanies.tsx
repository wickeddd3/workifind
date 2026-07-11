import { ViewMoreButton } from "@/shared/ui/ViewMoreButton";

import { getSuggestedCompaniesQuery } from "../api/company.queries";
import { CompaniesCarousel } from "./CompaniesCarousel";

export async function SuggestedCompanies({
  hasSeeMoreButton = false,
}: {
  hasSeeMoreButton?: boolean;
}) {
  const companies = await getSuggestedCompaniesQuery({ size: 8 });

  return (
    <section className="flex w-full flex-col space-y-2 py-2 md:py-4">
      <h2 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
        Explore companies
      </h2>
      <p className="text-sm font-normal text-gray-600 md:text-md">
        See who&apos;s hiring and what it&apos;s like to work there.
      </p>
      <div className="flex gap-4 py-2">
        <CompaniesCarousel companies={companies.data || []} />
      </div>
      {hasSeeMoreButton && (
        <ViewMoreButton text="See more" route="/companies" />
      )}
    </section>
  );
}
