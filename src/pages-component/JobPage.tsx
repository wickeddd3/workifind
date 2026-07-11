import { notFound } from "next/navigation";

import { getApplicant } from "@/entities/applicant";
import { getJobBySlug, JobDescription, JobHeader } from "@/entities/job";
import { checkIfAlreadyApplied } from "@/entities/job-application";
import { checkIfAlreadySaved } from "@/entities/saved-job";
import { ApplyButton } from "@/features/job/apply-to-job";
import { SaveButton } from "@/features/job/save-job";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { buildJobPostingSchema } from "@/shared/lib/structured-data";
import { JsonLd } from "@/shared/ui/JsonLd";

export async function JobPage({ slug }: { slug: string }) {
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const { role, userId } = await getAuthUser();
  const applicant = await getApplicant(userId || "");
  const hasApplied = await checkIfAlreadyApplied(userId || "", job?.id);
  const isSaved = await checkIfAlreadySaved(userId || "", job.id);
  const hasOption = role === "APPLICANT" && applicant && userId;

  return (
    <section className="mx-3 my-6 h-full w-full max-w-4xl grow space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:mx-auto md:p-8">
      <JsonLd data={buildJobPostingSchema(job)} />
      <JobHeader
        job={job}
        optionSlot={
          hasOption && (
            <>
              <ApplyButton job={job} hasApplied={hasApplied} />
              <SaveButton
                jobId={job.id}
                applicantId={applicant.id}
                initialIsSaved={isSaved}
              />
            </>
          )
        }
      />
      <JobDescription description={job.description} />
    </section>
  );
}
