import { getJobBySlug, JobDescription, JobHeader } from "@/entities/job";
import { JobSelectedEmptyPlaceholder } from "./JobSelectedEmptyPlaceholder";
import { getAuthUser } from "@/shared/lib/clerk";
import { getApplicant } from "@/entities/applicant";
import { checkIfAlreadyApplied } from "@/entities/job-application";
import { checkIfAlreadySaved } from "@/entities/saved-job";
import { SaveButton } from "@/features/job/save-job";
import { ApplyButton } from "@/features/job/apply-to-job";

export async function JobSelected({ slug }: { slug: string }) {
  if (!slug) return <JobSelectedEmptyPlaceholder />;

  const job = await getJobBySlug(slug);
  if (!job) return <JobSelectedEmptyPlaceholder />;

  const { role, user } = await getAuthUser();
  const applicant = await getApplicant(user?.id || "");
  const hasApplied = await checkIfAlreadyApplied(user?.id || "", job?.id || 0);
  const isSaved = await checkIfAlreadySaved(user?.id || "", job?.id || 0);
  const hasOption = role === "APPLICANT" && applicant && user;

  return (
    <div className="m-auto h-full w-full">
      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
