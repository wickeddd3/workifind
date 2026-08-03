import Link from "next/link";

import {
  type ApplicantProfile,
  getProfileCompleteness,
  ProfileCompleteness,
} from "@/entities/applicant";
import { Button } from "@/shared/ui/button";

import { AboutSection } from "./sections/AboutSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { IdentitySection } from "./sections/IdentitySection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { PreferencesSection } from "./sections/PreferencesSection";
import { SkillsSection } from "./sections/SkillsSection";

/**
 * The applicant profile editor.
 *
 * Eight sections, each saving on its own, mirroring the blocks the profile page
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
      <ExperienceSection applicant={applicant} />
      <EducationSection applicant={applicant} />
      <CertificationsSection applicant={applicant} />
      <SkillsSection applicant={applicant} />
      <LanguagesSection applicant={applicant} />
      <PreferencesSection applicant={applicant} />
    </div>
  );
}
