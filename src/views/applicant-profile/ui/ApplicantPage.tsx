import { notFound } from "next/navigation";

import {
  ApplicantBio,
  ApplicantCertificationList,
  ApplicantEducationList,
  ApplicantExperienceList,
  ApplicantHeader,
  ApplicantLanguages,
  ApplicantPreferences,
  ApplicantSkills,
  getApplicantProfile,
  getProfileCompleteness,
  ProfileCompleteness,
} from "@/entities/applicant";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ProfileSection } from "@/shared/ui/profile/ProfileSection";

const EDIT = "/applicant/profile/edit";

export async function ApplicantPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const applicant = await getApplicantProfile(userId);

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
        id="experience"
        title="Work experience"
        editHref={`${EDIT}#experience`}
        isEmpty={!applicant.experiences?.length}
        emptyPrompt="Add the roles you've held — this is the first thing employers read."
      >
        <ApplicantExperienceList experiences={applicant.experiences} />
      </ProfileSection>

      <ProfileSection
        id="education"
        title="Education"
        editHref={`${EDIT}#education`}
        isEmpty={!applicant.educations?.length}
        emptyPrompt="Add where you studied."
      >
        <ApplicantEducationList educations={applicant.educations} />
      </ProfileSection>

      <ProfileSection
        id="certifications"
        title="Certifications"
        editHref={`${EDIT}#certifications`}
        isEmpty={!applicant.certifications?.length}
        emptyPrompt="Add any licences or certificates you hold."
      >
        <ApplicantCertificationList certifications={applicant.certifications} />
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
