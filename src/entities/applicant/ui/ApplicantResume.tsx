import { FileDownloadLink } from "@/shared/ui/FileDownloadLink";
import { longLocalizedDate } from "@/shared/utils/format-date";

import { applicantResumeHref, type ResumeSummary } from "../model/resume";

/**
 * The résumé block on a profile, for the owner and for an employer alike.
 *
 * It takes a `ResumeSummary` rather than the applicant record, and that is the
 * point: the record carries `resumeUrl`, and a component that accepted it would
 * be one `"use client"` away from serializing a permanent, unauthenticated link
 * to someone's personal data into the page. The href here goes to the route
 * that checks who is asking.
 *
 * The upload date is shown because it is what the reader actually wants to
 * know — a two-year-old CV attached to a fresh application is worth seeing.
 */
export function ApplicantResume({
  applicantId,
  resume,
}: {
  applicantId: string;
  resume: ResumeSummary;
}) {
  return (
    <FileDownloadLink
      href={applicantResumeHref(applicantId)}
      name={resume.name}
      meta={
        resume.uploadedAt
          ? `Uploaded ${longLocalizedDate(resume.uploadedAt)}`
          : undefined
      }
    />
  );
}
