import { ProfileCompletenessMeter } from "@/shared/ui/profile/ProfileCompletenessMeter";

import type { ProfileCompleteness as Completeness } from "../model/completeness";

/**
 * The applicant's completeness meter: the shared instrument, plus the argument
 * that applies to a job seeker.
 */
export function ProfileCompleteness({
  completeness,
  editHref = "/applicant/profile/edit",
  className,
}: {
  completeness: Completeness;
  editHref?: string;
  className?: string;
}) {
  return (
    <ProfileCompletenessMeter
      completeness={completeness}
      editHref={editHref}
      hint="Profiles with skills and preferences show up in more employer searches."
      doneHint="Your profile is complete — employers can find you on every filter."
      className={className}
    />
  );
}
