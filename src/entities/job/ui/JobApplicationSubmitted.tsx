import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { DEFAULT_COMPANY_LOGO } from "@/shared/constants/logo";
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
    <section className="h-full w-full grow space-y-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:h-20 md:w-20">
          <Image
            src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
            alt={`${companyName} logo`}
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Applied to
          </p>
          <h1 className="truncate text-lg font-bold text-gray-900 md:text-xl lg:text-2xl">
            {title}
          </h1>
          <p className="truncate text-sm font-medium text-gray-500 md:text-md">
            {companyName}
          </p>
          <Link
            href={`/jobs/${slug}`}
            className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700 md:text-sm"
          >
            View job description
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={32} aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
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
