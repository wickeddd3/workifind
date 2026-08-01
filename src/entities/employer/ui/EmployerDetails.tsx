import { SectionHeading } from "@/shared/ui/typography/Typography";

import { EmployerOverview } from "./EmployerOverview";
import { EmployerRichText } from "./EmployerRichText";

/**
 * The "About" tab of a public company page.
 *
 * Composes the same headingless blocks the owner's profile page stacks into
 * cards, so the two pages can never describe a company differently.
 */
export function EmployerDetails({
  industry,
  location,
  about,
}: {
  industry?: string | null;
  location?: string | null;
  about?: string | null;
}) {
  return (
    <div className="flex flex-col space-y-8">
      {(industry || location) && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>Company overview</SectionHeading>
          <EmployerOverview industry={industry} location={location} />
        </div>
      )}
      {about && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>About us</SectionHeading>
          <EmployerRichText>{about}</EmployerRichText>
        </div>
      )}
    </div>
  );
}
