import { notFound } from "next/navigation";

import {
  ApplicantBio,
  ApplicantCertificationList,
  ApplicantEducationList,
  ApplicantExperienceList,
  ApplicantHeader,
  ApplicantLanguages,
  ApplicantPreferences,
  ApplicantResume,
  ApplicantSkills,
  getApplicantProfile,
  getProfileCompleteness,
  ProfileCompleteness,
  toResumeSummary,
} from "@/entities/applicant";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ProfileSection } from "@/shared/ui/profile/ProfileSection";
import { ProfileSectionNav } from "@/shared/ui/profile/ProfileSectionNav";

import { PROFILE_SECTIONS } from "../model/sections";

const EDIT = "/applicant/profile/edit";

export async function ApplicantPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const applicant = await getApplicantProfile(userId);

  if (!applicant) notFound();

  const completeness = getProfileCompleteness(applicant);
  const resume = toResumeSummary(applicant);

  // Two columns, split by what each is for. The rail answers "who am I here
  // and what's left to do" and stays put; the column beside it is the profile
  // itself. Previously all of that was one stack, so the completeness meter —
  // the only part with anything to act on — scrolled away first and the rest
  // was an undifferentiated run of seven cards.
  //
  // The panels still mirror the edit page's sections one-for-one — same ids,
  // same titles, same order — so moving between reading and editing never asks
  // the owner to re-find where something lives.
  return (
    <div className="mx-auto my-6 w-full max-w-6xl px-4 md:my-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:w-72 lg:shrink-0">
          <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
            <ApplicantHeader
              applicant={applicant}
              hasEditButton={true}
              as="h1"
              orientation="stacked"
            />
          </section>

          {completeness.missing.length > 0 && (
            <ProfileCompleteness completeness={completeness} />
          )}

          <ProfileSectionNav sections={PROFILE_SECTIONS} />
        </aside>

        {/* Capped at the edit page's width rather than left to fill: the two
            render the same sections, so a section that is wider here than
            there reads as the page jumping when you switch between them. */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:max-w-3xl">
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
            id="resume"
            title="Résumé"
            editHref={`${EDIT}#resume`}
            isEmpty={!resume}
            emptyPrompt="Attach a résumé — it goes out with every application you send."
          >
            {resume && (
              <ApplicantResume applicantId={applicant.id} resume={resume} />
            )}
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
            <ApplicantCertificationList
              certifications={applicant.certifications}
            />
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
      </div>
    </div>
  );
}
