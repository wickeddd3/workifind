/**
 * Where the browser fetches the résumé sent with one application.
 *
 * A near-copy of the applicant entity's own helper, and deliberately so:
 * entities are siblings and do not import each other, and the two routes
 * authorize differently — this one is readable by the employer who received
 * the application, the profile one by any employer.
 */
export function jobApplicationResumeHref(jobApplicationId: string): string {
  return `/api/job-applications/${jobApplicationId}/resume`;
}
