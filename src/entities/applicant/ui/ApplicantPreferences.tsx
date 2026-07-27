import { MediumText, SectionHeading } from "@/shared/ui/typography/Typography";

export function ApplicantPreferences({
  preferredEmploymentTypes,
  preferredLocationTypes,
  preferredLocations,
  availability,
  salaryExpectation,
}: {
  preferredEmploymentTypes: string[];
  preferredLocationTypes: string[];
  preferredLocations: { name: string }[];
  availability: string;
  salaryExpectation: number;
}) {
  const hasPreferredEmploymentTypes =
    preferredEmploymentTypes && preferredEmploymentTypes.length > 0;
  const hasPreferredLocationTypes =
    preferredLocationTypes && preferredLocationTypes.length > 0;
  const hasPreferredLocations =
    preferredLocations && preferredLocations.length > 0;

  return (
    <div className="flex flex-col space-y-4">
      <SectionHeading>About my next role</SectionHeading>
      <div className="divide-y divide-border rounded-xl border border-border shadow-soft">
        {availability && (
          <div className="flex flex-col gap-1 p-4">
            <MediumText>Availability</MediumText>
            <span className="text-sm text-foreground">{availability}</span>
          </div>
        )}
        {hasPreferredEmploymentTypes && (
          <div className="flex flex-col gap-1 p-4">
            <MediumText>Preferred employment types</MediumText>
            <span className="text-sm text-foreground">
              {preferredEmploymentTypes.join(", ")}
            </span>
          </div>
        )}
        {hasPreferredLocationTypes && (
          <div className="flex flex-col gap-1 p-4">
            <MediumText>Preferred location types</MediumText>
            <span className="text-sm text-foreground">
              {preferredLocationTypes.join(", ")}
            </span>
          </div>
        )}
        {hasPreferredLocations && (
          <div className="flex flex-col gap-1 p-4">
            <MediumText>Preferred locations</MediumText>
            <span className="text-sm text-foreground">
              {preferredLocations.map((location) => location?.name).join(", ")}
            </span>
          </div>
        )}
        {availability && (
          <div className="flex flex-col gap-1 p-4">
            <MediumText>Salary expectation</MediumText>
            <span className="text-sm text-foreground">
              {salaryExpectation.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
