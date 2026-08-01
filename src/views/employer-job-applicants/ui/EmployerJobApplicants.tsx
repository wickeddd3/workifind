import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  getEmployerJob,
  JobDescription,
  JobHeaderCompact,
} from "@/entities/job";
import { ReceivedApplications } from "@/features/received-applications";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { Button } from "@/shared/ui/button";
import { ListSkeleton } from "@/shared/ui/ListSkeleton";
import { ProfileSection } from "@/shared/ui/profile/ProfileSection";
import { SectionHeading } from "@/shared/ui/typography/Typography";

export async function EmployerJobApplicants({
  id,
  searchParams,
}: {
  id: number;
  searchParams: Record<string, string>;
}) {
  const { userId, role } = await getAuthUser();

  if (role !== "EMPLOYER" || !userId) notFound();

  // Scoped to the owner: the id comes from the URL, and this page shows the
  // names, emails and pitches of everyone who applied.
  const job = await getEmployerJob(userId, id);

  if (!job) notFound();

  // Applicants first, description last. The two used to share a tab strip,
  // which made the applicants — the only reason to open this page — one of two
  // equal-looking choices, and kept the count hidden until you picked the right
  // one.
  return (
    // Same container as the employer's job posts and the applicant's own lists.
    <section className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/employer/jobs"
          className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          All job posts
        </Link>
        <Button asChild variant="outline" size="sm">
          <Link href={`/employer/jobs/${id}`}>Edit post</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
        <JobHeaderCompact job={job} />
      </div>

      <div className="flex flex-col gap-3">
        <SectionHeading>Applicants</SectionHeading>
        {/* The job above is already loaded; only the applicants wait on a
            second query. */}
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<ListSkeleton rows={5} metaLines={3} />}
        >
          <ReceivedApplications
            userId={userId}
            jobId={id}
            searchParams={searchParams}
          />
        </Suspense>
      </div>

      <ProfileSection
        id="description"
        title="Job description"
        editHref={`/employer/jobs/${id}`}
        isEmpty={!job.description?.trim()}
        emptyPrompt="This post has no description yet — candidates see an empty listing."
      >
        <JobDescription description={job.description} />
      </ProfileSection>
    </section>
  );
}
