import { notFound } from "next/navigation";
import {
  ApplicantBio,
  ApplicantHeader,
  ApplicantLanguages,
  ApplicantPreferences,
  ApplicantSkills,
} from "@/entities/applicant";
import { getApplicant } from "@/entities/applicant";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function ApplicantPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const applicant = await getApplicant(userId);

  if (!applicant) notFound();

  return (
    <section className="flex flex-col space-y-6 px-0 pb-8 md:px-4">
      <ApplicantHeader applicant={applicant} hasEditButton={true} />
      <div className="flex flex-col gap-4 px-4 md:px-8">
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
  );
}
