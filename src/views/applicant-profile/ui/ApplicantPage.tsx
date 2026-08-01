import { notFound } from "next/navigation";

import {
  ApplicantBio,
  ApplicantHeader,
  ApplicantLanguages,
  ApplicantPreferences,
  ApplicantSkills,
  getApplicant,
  getProfileCompleteness,
  ProfileCompleteness,
} from "@/entities/applicant";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ProfileSection } from "@/shared/ui/profile/ProfileSection";

const EDIT = "/applicant/profile/edit";

export async function ApplicantPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const applicant = await getApplicant(userId);

  if (!applicant) notFound();

  const completeness = getProfileCompleteness(applicant);

  // The panels mirror the edit page's sections one-for-one — same ids, same
  // titles, same order — so moving between reading and editing never asks the
  // owner to re-find where something lives.
  return (
    // Width, padding and gap match the edit page exactly — the two render the
    // same sections, so a difference here reads as the page jumping when you
    // switch between them.
    <div className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      {completeness.missing.length > 0 && (
        <ProfileCompleteness completeness={completeness} />
      )}

      <section
        id="contact"
        className="flex scroll-mt-24 flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6"
      >
        <ApplicantHeader applicant={applicant} hasEditButton={true} />
      </section>

      <ProfileSection
        id="about"
        title="About me"
        editHref={`${EDIT}#about`}
        isEmpty={!applicant.about?.trim()}
        emptyPrompt="Tell employers who you are and what you're looking for."
      >
        <ApplicantBio bio={applicant.about} />
      </ProfileSection>

      <ProfileSection
        id="skills"
        title="Skills"
        editHref={`${EDIT}#skills`}
        isEmpty={!applicant.skills?.length}
        emptyPrompt="Add the skills you work with — these are matched against job descriptions."
      >
        <ApplicantSkills skills={applicant.skills} />
      </ProfileSection>

      <ProfileSection
        id="languages"
        title="Languages"
        editHref={`${EDIT}#languages`}
        isEmpty={!applicant.languages?.length}
        emptyPrompt="Add the languages you can work in."
      >
        <ApplicantLanguages languages={applicant.languages} />
      </ProfileSection>

      <ProfileSection
        id="preferences"
        title="Job preferences"
        editHref={`${EDIT}#preferences`}
        isEmpty={
          !applicant.availability &&
          !applicant.salaryExpectation &&
          !applicant.preferredEmploymentTypes?.length &&
          !applicant.preferredLocationTypes?.length &&
          !applicant.preferredLocations?.length
        }
        emptyPrompt="Set what you're looking for so employers can filter you in."
      >
        <ApplicantPreferences
          preferredEmploymentTypes={applicant.preferredEmploymentTypes}
          preferredLocationTypes={applicant.preferredLocationTypes}
          preferredLocations={applicant.preferredLocations}
          availability={applicant.availability}
          salaryExpectation={applicant.salaryExpectation}
        />
      </ProfileSection>
    </div>
  );
}
