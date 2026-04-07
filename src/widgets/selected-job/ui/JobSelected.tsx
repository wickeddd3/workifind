import { getJobDetailsBySlug, JobDescription, JobHeader } from "@/entities/job";
import { JobSelectedEmptyPlaceholder } from "./JobSelectedEmptyPlaceholder";
import { getAuthUser } from "@/shared/lib/clerk";
import { getApplicantProfile } from "@/entities/applicant";
import { authorizeSaveJobAttempt, SaveButton } from "@/features/job/save-job";
import { ApplyButton } from "@/features/job/apply-to-job";

export async function JobSelected({ slug }: { slug: string }) {
  if (!slug) return <JobSelectedEmptyPlaceholder />;

  const job = await getJobDetailsBySlug(slug);
  if (!job) return <JobSelectedEmptyPlaceholder />;

  const { role, user } = await getAuthUser();
  const applicant = await getApplicantProfile(user?.id || "");

  const initialIsSaved = await authorizeSaveJobAttempt(
    user?.id || "",
    job?.id || 0,
  );
  const hasOption = role === "APPLICANT" && applicant && user;

  return (
    <div className="m-auto h-full w-full">
      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
