/**
 * The shape a profile's completeness takes, whichever profile it is.
 *
 * Applicants and employers answer "how complete is this?" from different
 * fields, so each entity owns the rules; what they share is the reporting
 * shape, and that lives here so one meter can render either.
 */

export interface ProfileSectionStatus {
  /** Matches the section's id on the profile and editor pages, so a prompt can
   *  link straight to it. */
  id: string;
  label: string;
  /** What the user should do, phrased as the action. */
  prompt: string;
  complete: boolean;
}

export interface ProfileCompleteness {
  percent: number;
  sections: ProfileSectionStatus[];
  missing: ProfileSectionStatus[];
}
