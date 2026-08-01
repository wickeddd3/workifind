import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { EmployerJobs } from "@/features/job-posts";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { Button } from "@/shared/ui/button";
import { ListSkeleton } from "@/shared/ui/ListSkeleton";

export async function EmployerJobsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { userId, role } = await getAuthUser();

  const isEmployer = role === "EMPLOYER";

  if (!isEmployer || !userId) return notFound();

  return (
    // Width, padding and gap match the applicant's applied and saved job lists
    // — the three are the same page for different people.
    <section className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold text-foreground md:text-xl">
            Your job posts
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage the roles you&apos;re hiring for.
          </p>
        </div>
        {/* Posting is the one thing this page exists to lead to, so it stays
            reachable without scrolling past the list to find it. */}
        <Button asChild size="sm">
          <Link href="/employer/jobs/new">Post a job</Link>
        </Button>
      </div>
      {/* The heading above is known immediately; only the list waits on the
          database. */}
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<ListSkeleton rows={5} metaLines={3} />}
      >
        <EmployerJobs userId={userId} searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
