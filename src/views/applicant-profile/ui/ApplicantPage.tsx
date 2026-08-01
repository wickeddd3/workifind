import { notFound } from "next/navigation";

import {
  ApplicantBio,
  ApplicantHeader,
  ApplicantLanguages,
  ApplicantPreferences,
  ApplicantSkills,
  getProfileCompleteness,
  ProfileCompleteness,
} from "@/entities/applicant";
import { getApplicant } from "@/entities/applicant";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function ApplicantPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const applicant = await getApplicant(userId);

  if (!applicant) notFound();

  const completeness = getProfileCompleteness(applicant);

  return (
    <div className="mx-auto my-6 flex w-full max-w-4xl flex-col gap-5 px-3 md:my-10">
      {/* Sits above the profile rather than inside it: the gaps it names are
          about the record, not part of what an employer would read. Hidden once
          there is nothing left to prompt for. */}
      {completeness.missing.length > 0 && (
        <ProfileCompleteness completeness={completeness} />
      )}

      <section className="flex flex-col space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
        <ApplicantHeader applicant={applicant} hasEditButton={true} />
        <div className="flex flex-col gap-6">
          <ApplicantBio bio={applicant.about} />
          <ApplicantSkills skills={applicant.skills} />
          <ApplicantLanguages languages={applicant.languages} />
          <ApplicantPreferences
            preferredEmploymentTypes={applicant.preferredEmploymentTypes}
            preferredLocationTypes={applicant.preferredLocationTypes}
            preferredLocations={applicant.preferredLocations}
            availability={applicant.availability}
            salaryExpectation={applicant.salaryExpectation}
          />
        </div>
      </section>
    </div>
  );
}
