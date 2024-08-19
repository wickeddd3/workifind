import { Employer } from "@prisma/client";
import CompanyInitialListItem from "@/components/companies/CompanyInitialListItem";
import Link from "next/link";
import ViewMoreButton from "@/components/ViewMoreButton";

interface CompanyInitialListProps {
  companies: Employer[];
  hasSeeMoreButton?: boolean;
}

export default function CompanyInitialList({
  companies = [],
  hasSeeMoreButton = false,
}: CompanyInitialListProps) {
  return (
    <section className="flex w-full flex-col space-y-2 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Explore companies
      </h1>
      <h5 className="text-lg font-normal text-gray-700">
        Learn about new jobs and company culture.
      </h5>
      <div className="flex py-4">
        {companies.map((company) => (
          <Link href={`/companies/${company.slug}`} key={company.slug}>
            <CompanyInitialListItem company={company} />
          </Link>
        ))}
      </div>
      {hasSeeMoreButton && <ViewMoreButton text="See more" route="" />}
    </section>
  );
}
