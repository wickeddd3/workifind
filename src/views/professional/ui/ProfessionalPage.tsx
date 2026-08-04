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
  getApplicantById,
  toResumeSummary,
} from "@/entities/applicant";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ProfileSection } from "@/shared/ui/profile/ProfileSection";

export async function ProfessionalPage({ id }: { id: string }) {
  // Candidate profiles carry personal data, so only employers may read them.
  const { userId, role } = await getAuthUser();

  if (!userId || role !== "EMPLOYER") return notFound();

  const applicant = await getApplicantById(id);

  if (!applicant) notFound();

  const resume = toResumeSummary(applicant);

  // The same panels the owner sees, without the edit affordances — and without
  // the empty ones, since `ProfileSection` drops a section with nothing in it
  // when there is no `editHref`. A visitor has no use for "no languages listed".
  return (
    // Same container as the owner's profile page, so an employer's view of a
    // professional and the owner's own view of it are the same page.
    <div className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
        <ApplicantHeader applicant={applicant} as="h1" />
      </section>

      <ProfileSection
        id="about"
        title="About me"
        isEmpty={!applicant.about?.trim()}
      >
        <ApplicantBio bio={applicant.about} />
      </ProfileSection>

      {/* No `isEmpty` fallback needed: `ProfileSection` drops an empty section
          for a visitor, and a résumé is exactly the kind of thing an employer
          should not be told is absent in a section of its own. */}
      <ProfileSection id="resume" title="Résumé" isEmpty={!resume}>
        {resume && (
          <ApplicantResume applicantId={applicant.id} resume={resume} />
        )}
      </ProfileSection>

      <ProfileSection
        id="experience"
        title="Work experience"
        isEmpty={!applicant.experiences?.length}
      >
        <ApplicantExperienceList experiences={applicant.experiences} />
      </ProfileSection>

      <ProfileSection
        id="education"
        title="Education"
        isEmpty={!applicant.educations?.length}
      >
        <ApplicantEducationList educations={applicant.educations} />
      </ProfileSection>

      <ProfileSection
        id="certifications"
        title="Certifications"
        isEmpty={!applicant.certifications?.length}
      >
        <ApplicantCertificationList certifications={applicant.certifications} />
      </ProfileSection>

      <ProfileSection
        id="skills"
        title="Skills"
        isEmpty={!applicant.skills?.length}
      >
        <ApplicantSkills skills={applicant.skills} />
      </ProfileSection>

      <ProfileSection
        id="languages"
        title="Languages"
        isEmpty={!applicant.languages?.length}
      >
        <ApplicantLanguages languages={applicant.languages} />
      </ProfileSection>

      <ProfileSection
        id="preferences"
        title="Job preferences"
        isEmpty={
          !applicant.availability &&
          !applicant.salaryExpectation &&
          !applicant.preferredEmploymentTypes?.length &&
          !applicant.preferredLocationTypes?.length &&
          !applicant.preferredLocations?.length
        }
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
