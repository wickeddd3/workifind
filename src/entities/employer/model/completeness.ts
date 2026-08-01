import type {
  ProfileCompleteness,
  ProfileSectionStatus,
} from "@/shared/ui/profile/types";

import type { Employer } from "./types";

/**
 * How complete a company profile is, section by section.
 *
 * The sections match the ones the profile page renders and the edit page saves,
 * so a gap named here always points at somewhere the employer can actually go
 * and fill in. Company name and industry are excluded deliberately: both are
 * required to create a profile at all, so counting them would start everyone at
 * a flattering number that never moves.
 */

function hasItems(list?: { name: string }[] | null) {
  return Boolean(list?.some((item) => item?.name?.trim()));
}

function hasText(value?: string | null) {
  return Boolean(value?.trim());
}

export function getCompanyProfileCompleteness(
  employer: Employer,
): ProfileCompleteness {
  const sections: ProfileSectionStatus[] = [
    {
      id: "identity",
      label: "Logo & contact",
      prompt: "Add your logo and contact details",
      // The logo is what a candidate sees first — it rides along on every job
      // card — and a way to reach you is what they need second.
      complete:
        hasText(employer.companyLogoUrl) &&
        (hasText(employer.companyEmail) || hasText(employer.companyWebsite)),
    },
    {
      id: "overview",
      label: "Company overview",
      prompt: "Add where you're based",
      complete: hasText(employer.location),
    },
    {
      id: "about",
      label: "About us",
      prompt: "Write an About us",
      complete: hasText(employer.about),
    },
    {
      id: "culture",
      label: "Why join us",
      prompt: "Say why people should join",
      complete: hasText(employer.pitch),
    },
    {
      id: "perks",
      label: "Perks",
      prompt: "List the perks you offer",
      complete: hasItems(employer.perks),
    },
  ];

  const done = sections.filter((section) => section.complete).length;

  return {
    percent: Math.round((done / sections.length) * 100),
    sections,
    missing: sections.filter((section) => !section.complete),
  };
}
