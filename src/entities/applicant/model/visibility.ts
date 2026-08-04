import type { ResumeSummary } from "./resume";
import { toResumeSummary } from "./resume";
import type { ApplicantProfile } from "./types";

/**
 * Who is reading a candidate profile, and therefore how much of it they get.
 *
 * The directory is open to everyone, so a profile is read by four different
 * kinds of visitor and each is owed a different amount. Modelling that as one
 * named tier rather than a scatter of `role === "EMPLOYER"` checks is what
 * keeps the page, the résumé route and the search results agreeing — they used
 * to be a single `notFound()` between them, and opening the directory is
 * exactly the change that makes three separate answers possible.
 */
export type ProfileViewer = "owner" | "employer" | "professional" | "guest";

export function resolveProfileViewer({
  ownerUserId,
  viewerUserId,
  viewerRole,
}: {
  ownerUserId: string;
  viewerUserId?: string;
  viewerRole?: "EMPLOYER" | "APPLICANT";
}): ProfileViewer {
  if (viewerUserId && viewerUserId === ownerUserId) return "owner";
  if (viewerRole === "EMPLOYER") return "employer";
  if (viewerUserId) return "professional";
  return "guest";
}

export interface ProfileVisibility {
  /** Email address and phone number. */
  contact: boolean;
  /** The stated salary expectation. */
  salary: boolean;
  /** The résumé section, and the download route behind it. */
  resume: boolean;
  /** The surname in full, rather than as an initial. */
  fullName: boolean;
}

/**
 * The rule, as a table.
 *
 * Everything a candidate would only hand to someone hiring — how to reach them,
 * what they expect to be paid, and their résumé — is employer-and-owner only.
 * A salary expectation sits with the contact details rather than with the rest
 * of the preferences deliberately: it is the candidate's negotiating position,
 * and a rival applicant reading it is the case this guards against, not a
 * scraper.
 *
 * What everyone else gets is the professional substance — experience, skills,
 * what kind of work is wanted — which is the part a profile exists to publish.
 * A signed-out visitor additionally sees the surname as an initial.
 */
const VISIBILITY: Record<ProfileViewer, ProfileVisibility> = {
  owner: { contact: true, salary: true, resume: true, fullName: true },
  employer: { contact: true, salary: true, resume: true, fullName: true },
  professional: {
    contact: false,
    salary: false,
    resume: false,
    fullName: true,
  },
  guest: { contact: false, salary: false, resume: false, fullName: false },
};

export function profileVisibility(viewer: ProfileViewer): ProfileVisibility {
  return VISIBILITY[viewer];
}

/**
 * A profile with everything this viewer may not read already gone.
 *
 * The omission is the point, and it is why this returns a new object rather
 * than a set of flags for the UI to respect. A blurred email is still an email:
 * it sits in the server-rendered HTML, and `curl` — or devtools, or reader
 * mode — reads it straight back out. The blur in `RedactedField` is what a
 * withheld value *looks* like; this is what makes it withheld.
 *
 * `resumeUrl` never survives regardless of tier. The blob is stored with public
 * access, so that URL is a permanent bearer token for the document — employers
 * reach it through `/api/applicants/[id]/resume`, which authorizes per request.
 */
export interface VisibleApplicantProfile
  extends Omit<
    ApplicantProfile,
    | "email"
    | "phoneNumber"
    | "salaryExpectation"
    | "resumeUrl"
    | "resumeName"
    | "resumeUploadedAt"
  > {
  email: string | null;
  phoneNumber: string | null;
  /** Null when unstated, or when this viewer may not see it. */
  salaryExpectation: number | null;
  /**
   * Contact details exist on the record but were withheld from this viewer, so
   * the UI can show a locked placeholder rather than silently rendering
   * nothing. False when the candidate simply never supplied any — "hidden" and
   * "not given" are different things to show.
   */
  contactWithheld: boolean;
  /** A salary expectation is stated but withheld. False when none is stated. */
  salaryWithheld: boolean;
  /** A résumé is on file but withheld. False when there is none at all. */
  resumeWithheld: boolean;
  /** Null when there is no résumé, or when this viewer may not see it. */
  resume: ResumeSummary | null;
}

export function toVisibleApplicantProfile(
  applicant: ApplicantProfile,
  viewer: ProfileViewer,
): VisibleApplicantProfile {
  const visibility = profileVisibility(viewer);

  const {
    email,
    phoneNumber,
    salaryExpectation,
    resumeUrl: _resumeUrl,
    resumeName: _resumeName,
    resumeUploadedAt: _resumeUploadedAt,
    ...rest
  } = applicant;

  const resume = toResumeSummary(applicant);
  const hasContact = Boolean(email || phoneNumber);
  // Stored as a whole number with 0 meaning "unstated", so a falsy check is the
  // test for "did they say" — not a null check.
  const hasSalary = salaryExpectation > 0;

  return {
    ...rest,
    // An initial, not a truncation: "Maria S." reads as a name deliberately
    // shortened, where "Maria" alone reads as a record missing its surname.
    lastName: visibility.fullName
      ? applicant.lastName
      : `${applicant.lastName.charAt(0).toUpperCase()}.`,
    email: visibility.contact ? email : null,
    phoneNumber: visibility.contact ? phoneNumber : null,
    salaryExpectation:
      visibility.salary && hasSalary ? salaryExpectation : null,
    contactWithheld: !visibility.contact && hasContact,
    salaryWithheld: !visibility.salary && hasSalary,
    resumeWithheld: !visibility.resume && Boolean(resume),
    resume: visibility.resume ? resume : null,
  };
}
