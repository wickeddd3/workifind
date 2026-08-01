import { notFound } from "next/navigation";

import {
  ApplicantBio,
  ApplicantHeader,
  ApplicantLanguages,
  ApplicantPreferences,
  ApplicantSkills,
  getApplicantById,
  ProfileSection,
} from "@/entities/applicant";

export async function ProfessionalPage({ id }: { id: string }) {
  const applicantId = parseInt(id);
  const applicant = await getApplicantById(applicantId);

  if (!applicant) notFound();

  // The same panels the owner sees, without the edit affordances — and without
  // the empty ones, since `ProfileSection` drops a section with nothing in it
  // when there is no `editHref`. A visitor has no use for "no languages listed".
  return (
    <div className="mx-auto my-6 flex w-full max-w-4xl flex-col gap-4 px-3 md:my-10">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
        <ApplicantHeader applicant={applicant} as="h1" />
      </section>

      <ProfileSection
        id="about"
        title="About me"
        isEmpty={!applicant.about?.trim()}
      >
        <ApplicantBio bio={applicant.about} />
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
