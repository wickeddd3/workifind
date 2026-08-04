import { Lock } from "lucide-react";
import Link from "next/link";
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
  resolveProfileViewer,
  toVisibleApplicantProfile,
} from "@/entities/applicant";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ProfileSection } from "@/shared/ui/profile/ProfileSection";

export async function ProfessionalPage({ id }: { id: string }) {
  // The directory is open, so this resolves how much of the profile to build
  // rather than whether to build one at all. What each tier gets is in
  // `profileVisibility`; everything withheld is dropped here, on the server.
  const { userId, role } = await getAuthUser();

  const applicant = await getApplicantById(id);

  if (!applicant) notFound();

  const viewer = resolveProfileViewer({
    ownerUserId: applicant.userId,
    viewerUserId: userId,
    viewerRole: role,
  });
  const profile = toVisibleApplicantProfile(applicant, viewer);

  // The same panels the owner sees, without the edit affordances — and without
  // the empty ones, since `ProfileSection` drops a section with nothing in it
  // when there is no `editHref`. A visitor has no use for "no languages listed".
  return (
    // Same container as the owner's profile page, so a visitor's view of a
    // professional and the owner's own view of it are the same page.
    <div className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
        <ApplicantHeader
          applicant={profile}
          contactWithheld={profile.contactWithheld}
          as="h1"
        />
      </section>

      <ProfileSection
        id="about"
        title="About me"
        isEmpty={!profile.about?.trim()}
      >
        <ApplicantBio bio={profile.about} />
      </ProfileSection>

      {/* Three states, not two. A résumé this viewer may read renders; one they
          may not says so, because a candidate who has attached a CV is worth
          signing in for; and a candidate with none at all shows nothing, since
          `ProfileSection` drops an empty section for a visitor. */}
      {profile.resumeWithheld ? (
        <ProfileSection id="resume" title="Résumé">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-3">
            <Lock
              size={16}
              className="shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              This professional has a résumé on file. Employers can download it.
            </p>
            {/* This branch only runs for a viewer who is neither the owner nor
                an employer, so the invitation always applies here. */}
            <Link
              href="/sign-up"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Hiring? Create an employer account
            </Link>
          </div>
        </ProfileSection>
      ) : (
        <ProfileSection id="resume" title="Résumé" isEmpty={!profile.resume}>
          {profile.resume && (
            <ApplicantResume applicantId={profile.id} resume={profile.resume} />
          )}
        </ProfileSection>
      )}

      <ProfileSection
        id="experience"
        title="Work experience"
        isEmpty={!profile.experiences?.length}
      >
        <ApplicantExperienceList experiences={profile.experiences} />
      </ProfileSection>

      <ProfileSection
        id="education"
        title="Education"
        isEmpty={!profile.educations?.length}
      >
        <ApplicantEducationList educations={profile.educations} />
      </ProfileSection>

      <ProfileSection
        id="certifications"
        title="Certifications"
        isEmpty={!profile.certifications?.length}
      >
        <ApplicantCertificationList certifications={profile.certifications} />
      </ProfileSection>

      <ProfileSection
        id="skills"
        title="Skills"
        isEmpty={!profile.skills?.length}
      >
        <ApplicantSkills skills={profile.skills} />
      </ProfileSection>

      <ProfileSection
        id="languages"
        title="Languages"
        isEmpty={!profile.languages?.length}
      >
        <ApplicantLanguages languages={profile.languages} />
      </ProfileSection>

      <ProfileSection
        id="preferences"
        title="Job preferences"
        isEmpty={
          !profile.availability &&
          !profile.salaryExpectation &&
          !profile.salaryWithheld &&
          !profile.preferredEmploymentTypes?.length &&
          !profile.preferredLocationTypes?.length &&
          !profile.preferredLocations?.length
        }
      >
        <ApplicantPreferences
          preferredEmploymentTypes={profile.preferredEmploymentTypes}
          preferredLocationTypes={profile.preferredLocationTypes}
          preferredLocations={profile.preferredLocations}
          availability={profile.availability}
          salaryExpectation={profile.salaryExpectation}
          salaryWithheld={profile.salaryWithheld}
        />
      </ProfileSection>
    </div>
  );
}
