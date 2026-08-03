import { formatMonthRange } from "@/shared/utils/format-month";

import type { ApplicantExperience } from "../model/types";
import { ApplicantRecordList } from "./ApplicantRecordList";

/** Body only — see `ProfileSection` for the heading and the empty case. */
export function ApplicantExperienceList({
  experiences,
}: {
  experiences: ApplicantExperience[];
}) {
  if (!experiences?.length) return null;

  return (
    <ApplicantRecordList
      items={experiences.map((experience) => ({
        key: `experience-${experience.id}`,
        title: experience.title,
        subtitle: experience.company,
        period: formatMonthRange(experience),
        meta: [experience.employmentType, experience.location],
        description: experience.description,
      }))}
    />
  );
}
