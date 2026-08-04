import type { ReactNode } from "react";

import { Badge } from "@/shared/ui/badge";
import { RedactedField } from "@/shared/ui/RedactedField";
import { formatMoney } from "@/shared/utils/format-money";

import type { ApplicantPreferredLocation } from "../model/types";

/**
 * Body only — see `ProfileSection` for the heading and the empty case.
 *
 * The block holds two kinds of answer and gives them different shapes.
 * Availability and salary are single facts, and they are the two an employer
 * scans a profile for, so they lead. Employment, work setting and locations are
 * sets, so they render as badges — the same treatment skills and languages get
 * on this page, where before they were comma-joined strings that matched
 * nothing else on it.
 *
 * Labels drop the word "Preferred". The section is already titled Job
 * preferences, and repeating it on every row inside said nothing.
 */

function Fact({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {/* Tabular figures so a salary lines up with any other on the page. */}
      <div className="tabular text-lg font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}

function TagRow({ label, values }: { label: string; values: string[] }) {
  if (!values.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <ul className="flex flex-wrap gap-2">
        {values.map((value) => (
          <li key={value}>
            <Badge variant="secondary">{value}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ApplicantPreferences({
  preferredEmploymentTypes,
  preferredLocationTypes,
  preferredLocations,
  availability,
  salaryExpectation,
  salaryWithheld = false,
}: {
  preferredEmploymentTypes: string[];
  preferredLocationTypes: string[];
  preferredLocations: ApplicantPreferredLocation[];
  availability: string;
  /** Null when unstated, or when the viewer may not read it. */
  salaryExpectation: number | null;
  /** An expectation is stated but withheld from this viewer. */
  salaryWithheld?: boolean;
}) {
  const facts: { label: string; value: ReactNode }[] = [];

  if (availability) facts.push({ label: "Available", value: availability });
  // Gated on the salary itself, not on availability — the copied condition once
  // hid a stated expectation whenever availability was blank, and threw on a
  // missing one whenever it was not.
  if (salaryExpectation) {
    facts.push({
      label: "Salary expectation",
      value: formatMoney(salaryExpectation),
    });
  } else if (salaryWithheld) {
    // Shown as withheld rather than dropped: a candidate who has named a figure
    // is a different thing from one who has not, and hiding the distinction
    // would tell an employer the wrong story about the profiles they skip.
    facts.push({
      label: "Salary expectation",
      value: (
        <RedactedField
          label="Salary expectation is visible to employers"
          width="6rem"
        />
      ),
    });
  }

  const tagRows = [
    { label: "Employment", values: preferredEmploymentTypes ?? [] },
    { label: "Work setting", values: preferredLocationTypes ?? [] },
    {
      label: "Locations",
      values: (preferredLocations ?? []).map((location) => location.name),
    },
  ].filter((row) => row.values.length > 0);

  if (facts.length === 0 && tagRows.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      {facts.length > 0 && (
        // Two up, but only when both are stated — a lone fact in a half-width
        // column reads as though the other half failed to load.
        <div
          className={
            facts.length === 2
              ? "grid grid-cols-2 gap-4 rounded-xl border border-border p-4"
              : "rounded-xl border border-border p-4"
          }
        >
          {facts.map((fact) => (
            <Fact key={fact.label} {...fact} />
          ))}
        </div>
      )}

      {tagRows.length > 0 && (
        <div className="flex flex-col gap-4">
          {tagRows.map((row) => (
            <TagRow key={row.label} {...row} />
          ))}
        </div>
      )}
    </div>
  );
}
