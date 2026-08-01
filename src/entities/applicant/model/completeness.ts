import type { Applicant } from "./types";

/**
 * How complete a profile is, section by section.
 *
 * The sections match the ones the profile page renders and the edit page saves,
 * so a gap named here always points at somewhere the user can actually go and
 * fill in. Identity is excluded deliberately: name, profession and email are
 * required to create a profile at all, so counting them would start everyone at
 * a flattering number that never moves.
 */

export interface ProfileSectionStatus {
  /** Matches the edit page's section ids, so a prompt can link straight to it. */
  id: "about" | "skills" | "languages" | "preferences" | "contact";
  label: string;
  /** What the user should do, phrased as the action. */
  prompt: string;
  complete: boolean;
}

export interface ProfileCompleteness {
  percent: number;
  sections: ProfileSectionStatus[];
  missing: ProfileSectionStatus[];
}

function hasItems(list?: { name: string }[] | null) {
  return Boolean(list?.some((item) => item?.name?.trim()));
}

function hasText(value?: string | null) {
  return Boolean(value?.trim());
}

export function getProfileCompleteness(
  applicant: Applicant,
): ProfileCompleteness {
  const sections: ProfileSectionStatus[] = [
    {
      id: "contact",
      label: "Contact details",
      prompt: "Add where you're based",
      complete: hasText(applicant.location),
    },
    {
      id: "about",
      label: "About me",
      prompt: "Write an About me",
      complete: hasText(applicant.about),
    },
    {
      id: "skills",
      label: "Skills",
      prompt: "Add your skills",
      complete: hasItems(applicant.skills),
    },
    {
      id: "languages",
      label: "Languages",
      prompt: "Add languages you speak",
      complete: hasItems(applicant.languages),
    },
    {
      id: "preferences",
      label: "Job preferences",
      prompt: "Set your job preferences",
      // Availability is required at creation, so it alone would never be a gap.
      // What employers actually filter on is the rest.
      complete:
        hasItems(applicant.preferredLocations) ||
        applicant.preferredEmploymentTypes?.length > 0 ||
        applicant.preferredLocationTypes?.length > 0,
    },
  ];

  const done = sections.filter((section) => section.complete).length;

  return {
    percent: Math.round((done / sections.length) * 100),
    sections,
    missing: sections.filter((section) => !section.complete),
  };
}
