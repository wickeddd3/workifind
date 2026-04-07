import { getAuthUser } from "@/shared/lib/clerk";
import { notFound } from "next/navigation";
import { getJobDetailsBySlug, JobDescription, JobHeader } from "@/entities/job";
import { ApplyButton } from "@/features/job/apply-to-job";
import { authorizeSaveJobAttempt, SaveButton } from "@/features/job/save-job";
import { getApplicantProfile } from "@/entities/applicant";

export async function JobPage({ slug }: { slug: string }) {
  const job = await getJobDetailsBySlug(slug);
  if (!job) notFound();

  const { role, user } = await getAuthUser();
  const applicant = await getApplicantProfile(user?.id || "");
  const initialIsSaved = await authorizeSaveJobAttempt(user?.id || "", job.id);
  const hasOption = role === "APPLICANT" && applicant && user;

  return (
    <section className="mx-auto h-full w-full max-w-4xl grow space-y-5 p-4">
      <JobHeader
        job={job}
        optionSlot={
          hasOption && (
            <>
              <ApplyButton job={job} />
              <SaveButton
                jobId={job.id}
                applicantId={applicant.id}
                userId={user.id}
                initialIsSaved={initialIsSaved}
              />
            </>
          )
        }
      />
      <JobDescription description={job.description} />
    </section>
  );
}
