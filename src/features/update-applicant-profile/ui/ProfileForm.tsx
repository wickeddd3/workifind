import Link from "next/link";

import {
  type ApplicantProfile,
  getProfileCompleteness,
  ProfileCompleteness,
  toResumeSummary,
} from "@/entities/applicant";
import { Button } from "@/shared/ui/button";
import { longLocalizedDate } from "@/shared/utils/format-date";

import { AboutSection } from "./sections/AboutSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { IdentitySection } from "./sections/IdentitySection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { PreferencesSection } from "./sections/PreferencesSection";
import { ResumeSection } from "./sections/ResumeSection";
import { SkillsSection } from "./sections/SkillsSection";

/**
 * The applicant profile editor.
 *
 * Nine sections, each saving on its own, mirroring the blocks the profile page
 * renders. It replaced a single fourteen-field form with one Save, where
 * editing a skill re-validated everything — so a stale phone number could block
 * an unrelated change, and the resulting failure was silent.
 *
 * The order follows a CV: who you are, then what you've done, then the tags
 * employers filter on. Work history sits directly under About me because it is
 * the substance of the profile, not a footnote to the skill list.
 *
 * This stays a server component: only the sections need the client, and keeping
 * the shell on the server means the completeness figure is computed from the
 * record that was just fetched.
 */
export function ProfileForm({ applicant }: { applicant: ApplicantProfile }) {
  const completeness = getProfileCompleteness(applicant);
  const resume = toResumeSummary(applicant);

  return (
    // Mirrors the profile page's container — see the note there.
    <div className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground">
            Edit your profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Each section saves on its own — there&apos;s no single Save to hunt
            for at the bottom.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/applicant/profile">View profile</Link>
        </Button>
      </div>

      <ProfileCompleteness completeness={completeness} />

      <IdentitySection applicant={applicant} />
      <AboutSection applicant={applicant} />
      {/* A summary, never the record: `ResumeSection` is a client component,
          and `applicant.resumeUrl` is a permanent unauthenticated link to a
          document full of personal data. The date is formatted here for the
          same reason it is read here — see the note on the prop. */}
      <ResumeSection
        resume={resume}
        uploadedLabel={
          resume?.uploadedAt ? longLocalizedDate(resume.uploadedAt) : undefined
        }
      />
      <ExperienceSection applicant={applicant} />
      <EducationSection applicant={applicant} />
      <CertificationsSection applicant={applicant} />
      <SkillsSection applicant={applicant} />
      <LanguagesSection applicant={applicant} />
      <PreferencesSection applicant={applicant} />
    </div>
  );
}
