import type { Prisma } from "@prisma/client";

import type { EmployerSection, EmployerSectionValues } from "./schema";

/**
 * Build the Prisma update for one section.
 *
 * Returning only that section's columns is what makes a section save
 * independent: saving perks cannot clobber an About edited elsewhere, and a
 * section the employer never touched is never written at all.
 *
 * The logo and the slug are deliberately absent — both are derived rather than
 * submitted, and the action owns them: the file has to be uploaded first, and
 * the slug may only change when the company name does.
 */
export function mapEmployerSection<S extends EmployerSection>(
  section: S,
  values: EmployerSectionValues[S],
): Prisma.EmployerUpdateInput {
  switch (section) {
    case "identity": {
      const v = values as EmployerSectionValues["identity"];
      return {
        companyName: v.companyName,
        companyEmail: v.companyEmail,
        companyWebsite: v.companyWebsite,
      };
    }
    case "overview": {
      const v = values as EmployerSectionValues["overview"];
      return { industry: v.industry, location: v.location };
    }
    case "about": {
      const v = values as EmployerSectionValues["about"];
      return { about: v.about };
    }
    case "culture": {
      const v = values as EmployerSectionValues["culture"];
      return { pitch: v.pitch };
    }
    case "perks": {
      const v = values as EmployerSectionValues["perks"];
      // A Json column holding an array of stringified objects.
      return { perks: v.perks?.map((perk) => JSON.stringify(perk)) ?? [] };
    }
  }

  // Unreachable while the switch stays exhaustive; guards a future section that
  // forgets to add a case.
  throw new Error(`Unhandled employer section: ${section}`);
}
