import { MediumText } from "@/shared/ui/typography/Typography";
import { formatMoney } from "@/shared/utils/format-money";

/** Body only — see `ProfileSection` for the heading and the empty case. */
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
  const rows: { label: string; value: string; tabular?: boolean }[] = [];

  if (availability) rows.push({ label: "Availability", value: availability });
  if (preferredEmploymentTypes?.length) {
    rows.push({
      label: "Preferred employment types",
      value: preferredEmploymentTypes.join(", "),
    });
  }
  if (preferredLocationTypes?.length) {
    rows.push({
      label: "Preferred location types",
      value: preferredLocationTypes.join(", "),
    });
  }
  if (preferredLocations?.length) {
    rows.push({
      label: "Preferred locations",
      value: preferredLocations.map((location) => location?.name).join(", "),
    });
  }
  // Gated on the salary, not on `availability` — the copied condition hid a
  // stated expectation whenever availability was blank, and threw on a missing
  // one whenever it was not.
  if (salaryExpectation) {
    rows.push({
      label: "Salary expectation",
      value: formatMoney(salaryExpectation),
      tabular: true,
    });
  }

  if (rows.length === 0) return null;

  return (
    <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border">
      {rows.map(({ label, value, tabular }) => (
        <div key={label} className="flex flex-col gap-1 p-4">
          <dt>
            <MediumText className="text-muted-foreground">{label}</MediumText>
          </dt>
          <dd className={tabular ? "tabular text-sm" : "text-sm"}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
