import { getAuthUser } from "@/shared/lib/clerk";
import { notFound } from "next/navigation";
import { getJobDetailsBySlug, JobDescription, JobHeader } from "@/entities/job";
import {
  ApplyButton,
  authorizeJobApplicationAttempt,
} from "@/features/job/apply-to-job";
import { authorizeSaveJobAttempt, SaveButton } from "@/features/job/save-job";
import { getApplicantProfile } from "@/entities/applicant";

export async function JobPage({ slug }: { slug: string }) {
  const job = await getJobDetailsBySlug(slug);
  if (!job) notFound();

  const { role, user } = await getAuthUser();
  const applicant = await getApplicantProfile(user?.id || "");
  const hasApplied = await authorizeJobApplicationAttempt(
    user?.id || "",
    job?.id || 0,
  );
  const isSaved = await authorizeSaveJobAttempt(user?.id || "", job.id);
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
