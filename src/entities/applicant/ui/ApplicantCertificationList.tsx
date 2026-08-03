import { formatMonthYear } from "@/shared/utils/format-month";

import type { ApplicantCertification } from "../model/types";
import { ApplicantRecordList } from "./ApplicantRecordList";

/** Body only — see `ProfileSection` for the heading and the empty case. */
export function ApplicantCertificationList({
  certifications,
}: {
  certifications: ApplicantCertification[];
}) {
  if (!certifications?.length) return null;

  return (
    <ApplicantRecordList
      items={certifications.map((certification) => {
        const issued = formatMonthYear(certification.issueDate);
        const expires = formatMonthYear(certification.expiryDate);

        return {
          key: `certification-${certification.id}`,
          title: certification.name,
          subtitle: certification.issuer,
          // Only the issue date belongs on the period line; expiry is a caveat
          // rather than the other end of a span, and reading "Mar 2024 – Mar
          // 2027" as a range suggests the holder stops being certified.
          period: issued,
          meta: [
            expires ? `Expires ${expires}` : null,
            certification.credentialId
              ? `ID ${certification.credentialId}`
              : null,
          ],
          footer: certification.credentialUrl ? (
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-xs font-semibold text-primary underline-offset-4 hover:underline"
            >
              View credential
              <span className="sr-only"> for {certification.name}</span>
            </a>
          ) : null,
        };
      })}
    />
  );
}
