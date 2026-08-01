import { ProfileCompletenessMeter } from "@/shared/ui/profile/ProfileCompletenessMeter";
import type { ProfileCompleteness } from "@/shared/ui/profile/types";

/**
 * The employer's completeness meter: the shared instrument, plus the argument
 * that applies to a company that wants applications.
 */
export function CompanyProfileCompleteness({
  completeness,
  editHref = "/employer/profile/edit",
  className,
}: {
  completeness: ProfileCompleteness;
  editHref?: string;
  className?: string;
}) {
  return (
    <ProfileCompletenessMeter
      completeness={completeness}
      editHref={editHref}
      hint="Companies with a logo, an About and perks get more applications per post."
      doneHint="Your company profile is complete — candidates see the full picture."
      className={className}
    />
  );
}
