import Link from "next/link";

import {
  CompanyProfileCompleteness,
  type Employer,
  getCompanyProfileCompleteness,
} from "@/entities/employer";
import { Button } from "@/shared/ui/button";

import { AboutSection } from "./sections/AboutSection";
import { CultureSection } from "./sections/CultureSection";
import { IdentitySection } from "./sections/IdentitySection";
import { OverviewSection } from "./sections/OverviewSection";
import { PerksSection } from "./sections/PerksSection";

/**
 * The company profile editor.
 *
 * Five sections, each saving on its own, mirroring the blocks the profile page
 * renders. It replaced a single nine-field form with one Save at the bottom,
 * where every save rewrote every field — including re-cutting the public slug —
 * and a redirect away from the page was the only sign it had worked.
 *
 * This stays a server component: only the sections need the client, and keeping
 * the shell on the server means the completeness figure is computed from the
 * record that was just fetched.
 */
export function ProfileForm({ employer }: { employer: Employer }) {
  const completeness = getCompanyProfileCompleteness(employer);

  return (
    // Mirrors the profile page's container — see the note there.
    <div className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground">
            Edit company profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Each section saves on its own — there&apos;s no single Save to hunt
            for at the bottom.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/employer/profile">View profile</Link>
        </Button>
      </div>

      <CompanyProfileCompleteness completeness={completeness} />

      <IdentitySection employer={employer} />
      <OverviewSection employer={employer} />
      <AboutSection employer={employer} />
      <CultureSection employer={employer} />
      <PerksSection employer={employer} />
    </div>
  );
}
