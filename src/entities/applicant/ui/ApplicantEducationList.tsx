import { formatMonthRange } from "@/shared/utils/format-month";

import type { ApplicantEducation } from "../model/types";
import { ApplicantRecordList } from "./ApplicantRecordList";

/** Body only — see `ProfileSection` for the heading and the empty case. */
export function ApplicantEducationList({
  educations,
}: {
  educations: ApplicantEducation[];
}) {
  if (!educations?.length) return null;

  return (
    <ApplicantRecordList
      items={educations.map((education) => ({
        key: `education-${education.id}`,
        // The qualification leads, not the school: it is what the degree line
        // of a CV is read for. A record that only names a school still has a
        // title, it is just the school.
        title: education.degree ?? education.school,
        subtitle: education.degree ? education.school : null,
        period: formatMonthRange(education),
        meta: [education.fieldOfStudy],
        description: education.description,
      }))}
    />
  );
}
