import { Heading4, MediumText } from "@/shared/ui/typography/Typography";

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
      <Heading4>About my next role</Heading4>
      <div className="flex flex-col gap-2 rounded-xl border-2 border-gray-100 p-4">
        {availability && (
          <div className="flex flex-col gap-2">
            <MediumText>Availability</MediumText>
            <span className="text-sm text-gray-900">{availability}</span>
          </div>
        )}
        {hasPreferredEmploymentTypes && (
          <div className="flex flex-col gap-2">
            <hr />
            <MediumText>Preferred employment types</MediumText>
            <span className="text-sm text-gray-900">
              {preferredEmploymentTypes.join(", ")}
            </span>
          </div>
        )}
        {hasPreferredLocationTypes && (
          <div className="flex flex-col gap-2">
            <hr />
            <MediumText>Preferred location types</MediumText>
            <span className="text-sm text-gray-900">
              {preferredLocationTypes.join(", ")}
            </span>
          </div>
        )}
        {hasPreferredLocations && (
          <div className="flex flex-col gap-2">
            <hr />
            <MediumText>Preferred locations</MediumText>
            {preferredLocations.map((location, index) => (
              <span
                className="text-sm text-gray-900"
                key={`${location}-${index}`}
              >
                {location?.name}
              </span>
            ))}
          </div>
        )}
        {availability && (
          <div className="flex flex-col gap-2">
            <hr />
            <MediumText>Salary expectation</MediumText>
            <span className="text-sm text-gray-900">{salaryExpectation}</span>
          </div>
        )}
      </div>
    </div>
  );
}
