import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

import type { Job } from "../model/types";

export function JobApplicationSubmitted({
  job: {
    slug,
    title,
    employer: { companyName, companyLogoUrl },
  },
}: {
  job: Job;
}) {
  return (
    <section className="w-full space-y-8">
      <div className="flex items-center gap-4">
        <Avatar
          name={companyName}
          src={companyLogoUrl}
          size={72}
          className="rounded-2xl"
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Applied to
          </p>
          <h1 className="truncate text-lg font-bold text-foreground md:text-xl lg:text-2xl">
            {title}
          </h1>
          <p className="truncate text-sm font-medium text-muted-foreground md:text-md">
            {companyName}
          </p>
          <Link
            href={`/jobs/${slug}`}
            className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary md:text-sm"
          >
            View job description
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/60 px-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={32} aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            Application submitted!
          </h2>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            Nice work — {companyName} can now review your application.
            You&apos;ll hear back by email.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/applicant/jobs">View your applications</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/jobs">Browse more jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
