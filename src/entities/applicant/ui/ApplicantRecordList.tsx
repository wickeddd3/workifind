import type { ReactNode } from "react";

import { MediumText } from "@/shared/ui/typography/Typography";

export interface ApplicantRecordItem {
  key: string;
  /** The role, the qualification, the certificate. */
  title: string;
  /** Where it was held, taken or issued. */
  subtitle?: string | null;
  /** The date span, shown alongside the title on wide screens. */
  period?: string;
  /** Short facts that sit under the subtitle, e.g. "Full-time · Remote". */
  meta?: (string | null | undefined)[];
  /** Free text the owner wrote about it. */
  description?: string | null;
  /** Anything that has to be interactive, such as a credential link. */
  footer?: ReactNode;
}

/**
 * The shared shape of the three CV blocks — work history, education,
 * certifications.
 *
 * They differ only in which fields feed which line, so they render through one
 * component: three near-identical lists were how the profile page and the
 * public page drifted apart on the smaller blocks already.
 *
 * Body only — see `ProfileSection` for the heading and the empty case.
 */
export function ApplicantRecordList({
  items,
}: {
  items: ApplicantRecordItem[];
}) {
  if (!items.length) return null;

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
      {items.map((item) => {
        const meta = item.meta?.filter(Boolean);

        return (
          <li key={item.key} className="flex flex-col gap-1.5 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <MediumText className="font-semibold text-foreground">
                {item.title}
              </MediumText>
              {item.period && (
                // Tabular figures so the year columns line up down the list.
                <span className="tabular shrink-0 text-xs text-muted-foreground">
                  {item.period}
                </span>
              )}
            </div>

            {item.subtitle && (
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            )}

            {meta?.length ? (
              <p className="text-xs text-muted-foreground">
                {meta.join(" · ")}
              </p>
            ) : null}

            {item.description?.trim() && (
              <p className="whitespace-pre-line text-sm text-foreground/90">
                {item.description}
              </p>
            )}

            {item.footer}
          </li>
        );
      })}
    </ul>
  );
}
