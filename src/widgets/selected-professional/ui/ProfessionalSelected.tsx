import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";

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

import { EmptyPlaceholder } from "./EmptyPlaceholder";

/**
 * The previewed profile beside the results list.
 *
 * Reads the same tier rules as the full page rather than a looser set: the pane
 * is a second way to the same record, and a preview that showed more than the
 * page it links to would be the hole in the whole arrangement.
 */
export async function ProfessionalSelected({ id }: { id?: string }) {
  if (!id) return <EmptyPlaceholder />;

  const [{ userId, role }, applicant] = await Promise.all([
    getAuthUser(),
    getApplicantById(id),
  ]);

  if (!applicant) return <EmptyPlaceholder />;

  const viewer = resolveProfileViewer({
    ownerUserId: applicant.userId,
    viewerUserId: userId,
    viewerRole: role,
  });
  const profile = toVisibleApplicantProfile(applicant, viewer);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <ApplicantHeader
          applicant={profile}
          contactWithheld={profile.contactWithheld}
        />
        <Link
          href={`/professionals/${profile.id}`}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Open full profile
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>

      {profile.about?.trim() && (
        <PaneSection title="About">
          <ApplicantBio bio={profile.about} />
        </PaneSection>
      )}

      {profile.resume && (
        <PaneSection title="Résumé">
          <ApplicantResume applicantId={profile.id} resume={profile.resume} />
        </PaneSection>
      )}

      {profile.resumeWithheld && (
        <PaneSection title="Résumé">
          <p className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">
            <Lock size={15} className="shrink-0" aria-hidden="true" />
            On file — employers can download it.
          </p>
        </PaneSection>
      )}

      {profile.experiences.length > 0 && (
        <PaneSection title="Work experience">
          <ApplicantExperienceList experiences={profile.experiences} />
        </PaneSection>
      )}

      {profile.educations.length > 0 && (
        <PaneSection title="Education">
          <ApplicantEducationList educations={profile.educations} />
        </PaneSection>
      )}

      {profile.certifications.length > 0 && (
        <PaneSection title="Certifications">
          <ApplicantCertificationList certifications={profile.certifications} />
        </PaneSection>
      )}

      {profile.skills.length > 0 && (
        <PaneSection title="Skills">
          <ApplicantSkills skills={profile.skills} />
        </PaneSection>
      )}

      {profile.languages.length > 0 && (
        <PaneSection title="Languages">
          <ApplicantLanguages languages={profile.languages} />
        </PaneSection>
      )}

      <PaneSection title="Job preferences">
        <ApplicantPreferences
          preferredEmploymentTypes={profile.preferredEmploymentTypes}
          preferredLocationTypes={profile.preferredLocationTypes}
          preferredLocations={profile.preferredLocations}
          availability={profile.availability}
          salaryExpectation={profile.salaryExpectation}
          salaryWithheld={profile.salaryWithheld}
        />
      </PaneSection>
    </div>
  );
}

/**
 * A heading and its block. Deliberately not `ProfileSection`: that renders its
 * own bordered card, and the pane is already one — nesting the two read as a
 * box inside a box down the whole column.
 */
function PaneSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}
