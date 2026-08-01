import { SectionHeading } from "@/shared/ui/typography/Typography";

import { EmployerPerkList } from "./EmployerPerkList";
import { EmployerRichText } from "./EmployerRichText";

/** The "Life and culture" tab of a public company page — see `EmployerDetails`. */
export function EmployerPerks({
  pitch,
  perks,
}: {
  pitch?: string | null;
  perks?: { name: string }[];
}) {
  return (
    <div className="flex flex-col space-y-8">
      {pitch && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>Why join us?</SectionHeading>
          <EmployerRichText>{pitch}</EmployerRichText>
        </div>
      )}
      {perks && perks.length > 0 && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>Perks</SectionHeading>
          <EmployerPerkList perks={perks} />
        </div>
      )}
    </div>
  );
}
