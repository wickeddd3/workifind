import { z } from "zod";

import { toSafeFileName } from "@/shared/utils/format-text";

/**
 * What counts as a résumé, in one place.
 *
 * It lives in the entity rather than in either feature that uploads one: the
 * profile editor and the apply form both accept the same file, and the two
 * places where a limit is written down are the two places it drifts. The
 * browser-safe half is here so `client.ts` can export it to the form fields;
 * the upload itself is in `api/resume.service.ts`.
 */

/**
 * PDF and Word only. Deliberately narrow — an employer opening an attachment
 * from a stranger should be opening a document format, and the proxy route
 * echoes whatever content type the blob was stored with.
 */
export const RESUME_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

/** Extensions too: browsers disagree about the MIME type they attach to .docx. */
export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

/** For the file input's `accept`. Extensions and types, for the same reason. */
export const RESUME_ACCEPT = [...RESUME_EXTENSIONS, ...RESUME_MIME_TYPES].join(
  ",",
);

/**
 * 4MB, and the ceiling is not ours to pick freely: the file is posted to a
 * route handler, and a serverless function on Vercel rejects a request body
 * over 4.5MB before any of our code runs. Sitting under that with room for the
 * multipart framing means the cap is enforced by a message we control rather
 * than by the platform returning 413 to a progress bar at 99%.
 */
export const RESUME_MAX_SIZE_BYTES = 4 * 1024 * 1024;
export const RESUME_MAX_SIZE_LABEL = "4MB";

/** How long a résumé filename may be once stored. */
export const RESUME_NAME_MAX_LENGTH = 120;

function hasResumeExtension(name: string) {
  return RESUME_EXTENSIONS.some((extension) =>
    name.toLowerCase().endsWith(extension),
  );
}

/**
 * Why a file is not acceptable, or `null` if it is.
 *
 * Returns the message rather than a boolean so the browser and the upload route
 * reject a file for the same stated reason. The browser check is a courtesy —
 * it saves sending 4MB to be told no — and the route repeats it, because
 * anything can post to a route.
 *
 * A type check *or* an extension check, not both: Windows Chrome reports
 * `.docx` as `application/octet-stream` often enough that requiring the MIME
 * type would turn away real résumés.
 */
export function getResumeFileError(file: File): string | null {
  const looksRight =
    (RESUME_MIME_TYPES as readonly string[]).includes(file.type) ||
    hasResumeExtension(file.name);

  if (!looksRight) return "Résumé must be a PDF or Word document";
  if (file.size === 0) return "That file is empty";
  if (file.size > RESUME_MAX_SIZE_BYTES) {
    return `Résumé must be smaller than ${RESUME_MAX_SIZE_LABEL}`;
  }

  return null;
}

/**
 * A résumé on a form, as it is submitted.
 *
 * Not the file. The bytes go to the upload route as soon as they are chosen —
 * that is what makes a progress bar possible, and what keeps a 4MB body out of
 * a Server Action, which caps at 1MB and cannot carry a `File` at all. What the
 * form submits is the signed reference the route handed back, and what the
 * action does with it is attach it to a record.
 *
 * Optional throughout: on the profile because a résumé is not required to have
 * one, and on the apply form because leaving it empty means "send the one on my
 * profile".
 */
export const ResumeUploadSchema = z.string().min(1).max(2000).optional();

/**
 * The parts of a stored résumé that are safe to render.
 *
 * Note what is missing: the blob URL. Components take this instead of the
 * record so a résumé cannot reach the browser by being a field on an object
 * that was passed somewhere client-side by habit.
 */
export interface ResumeSummary {
  name: string;
  uploadedAt: Date | null;
}

/** `null` when there is no résumé, so callers branch on one thing. */
export function toResumeSummary(applicant: {
  resumeUrl: string | null;
  resumeName: string | null;
  resumeUploadedAt?: Date | null;
}): ResumeSummary | null {
  if (!applicant.resumeUrl) return null;

  return {
    name: applicant.resumeName ?? "Résumé",
    uploadedAt: applicant.resumeUploadedAt ?? null,
  };
}

/**
 * The name a résumé is stored and downloaded under.
 *
 * The sanitizing is domain-free and shared; what belongs here is the fallback,
 * so a name that sanitizes away to nothing still downloads as something an
 * employer can find again.
 */
export function toResumeFileName(name: string): string {
  return toSafeFileName(name, RESUME_NAME_MAX_LENGTH) || "resume";
}

/** Where the browser fetches an applicant's current résumé. */
export function applicantResumeHref(applicantId: string): string {
  return `/api/applicants/${applicantId}/resume`;
}

/** Where the browser posts a résumé, before any record refers to it. */
export const RESUME_UPLOAD_ENDPOINT = "/api/applicants/resume";

/** What the upload route hands back: enough to show, plus the signed reference. */
export interface ResumeUploadResult {
  /** Signed, and the only thing the save action will accept. */
  token: string;
  name: string;
}
