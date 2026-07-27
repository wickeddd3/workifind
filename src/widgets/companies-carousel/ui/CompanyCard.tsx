import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { type Company } from "@/entities/employer";
import { Avatar } from "@/shared/ui/avatar";

export function CompanyCard({
  company: { slug, companyLogoUrl, companyName, industry, jobsCount },
}: {
  company: Company;
}) {
  return (
    <Link
      href={`/companies/${slug}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex h-[200px] min-w-[250px] flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-card-hover md:h-[208px]">
        <div className="flex items-start justify-between">
          <Avatar name={companyName} src={companyLogoUrl} size={56} />
          <ArrowUpRight
            size={18}
            className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary md:text-md">
            {companyName}
          </h3>
          <p className="truncate text-xs font-normal text-muted-foreground md:text-sm">
            {industry}
          </p>
          <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {jobsCount || 0} {jobsCount === 1 ? "job" : "jobs"}
          </span>
        </div>
      </div>
    </Link>
  );
}
