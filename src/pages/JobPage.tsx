import { getAuthUser } from "@/shared/lib/clerk";
import { notFound } from "next/navigation";
import { getJobBySlug, JobDescription, JobHeader } from "@/entities/job";
import { getApplicant } from "@/entities/applicant";
import { checkIfAlreadyApplied } from "@/entities/job-application";
import { checkIfAlreadySaved } from "@/entities/saved-job";
import { ApplyButton } from "@/features/job/apply-to-job";
import { SaveButton } from "@/features/job/save-job";

export async function JobPage({ slug }: { slug: string }) {
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const { role, user } = await getAuthUser();
  const applicant = await getApplicant(user?.id || "");
  const hasApplied = await checkIfAlreadyApplied(user?.id || "", job?.id);
  const isSaved = await checkIfAlreadySaved(user?.id || "", job.id);
  const hasOption = role === "APPLICANT" && applicant && user;

  return (
    <section className="mx-auto h-full w-full max-w-4xl grow space-y-5 p-4">
      <JobHeader
        job={job}
        optionSlot={
          hasOption && (
            <>
              <ApplyButton job={job} hasApplied={hasApplied} />
              <SaveButton
                jobId={job.id}
                applicantId={applicant.id}
                userId={user.id}
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
