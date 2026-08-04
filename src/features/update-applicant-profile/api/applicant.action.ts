"use server";

import type { Applicant, Prisma } from "@prisma/client";

import { resolveResumeUpload } from "@/entities/applicant";
import { requireRole } from "@/shared/lib/clerk.server";

import { mapApplicantSection } from "../model/map-applicant-data";
import {
  APPLICANT_SECTION_SCHEMAS,
  type ApplicantSectionPayload,
  type ApplicantSectionValues,
} from "../model/schema";
import { updateApplicant } from "./applicant.service";

/**
 * Save one section of the applicant profile.
 *
 * A single action rather than one per section: authorization and the
 * userId-scoped write are the parts worth not duplicating, and the payload's
 * discriminated union already stops a caller sending skills under the
 * `preferences` name.
 */
export async function updateApplicantSectionAction(
  payload: ApplicantSectionPayload,
): Promise<{ success: boolean; data: Applicant | null; message: string }> {
  try {
    const { userId } = await requireRole("APPLICANT");

    const schema = APPLICANT_SECTION_SCHEMAS[payload.section];
    if (!schema) {
      return { success: false, data: null, message: "Unknown profile section" };
    }

    // Never trust client input: re-validate server-side, against this section's
    // schema rather than the whole profile, so an unrelated field that happens
    // to be invalid cannot block this save.
    const parsed = schema.safeParse(payload.values);
    if (!parsed.success) {
      return {
        success: false,
        data: null,
        message: "Some fields need fixing before this section can be saved",
      };
    }

    const data = mapApplicantSection(payload.section, parsed.data as never);

    // The résumé columns are not a mapping — the file is already in storage and
    // what arrives here is a signed reference to it, which has to be checked.
    const resume =
      payload.section === "resume"
        ? resolveResume(parsed.data as ApplicantSectionValues["resume"], userId)
        : {};

    if (resume === null) {
      return {
        success: false,
        data: null,
        message: "That upload has expired. Please choose the file again.",
      };
    }

    const applicant = await updateApplicant(userId, { ...data, ...resume });
    if (!applicant) {
      return {
        success: false,
        data: null,
        message: "Could not save. Please try again.",
      };
    }

    return { success: true, data: applicant, message: "Saved" };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Could not save. Please try again.",
    };
  }
}

/**
 * The résumé columns to write, or `null` when a reference was submitted that we
 * will not act on.
 *
 * `null` for the failure rather than an empty object, because the two must not
 * look alike to the caller: an empty object is a legitimate save — the section
 * was opened, the file left alone, Save pressed — while a token that does not
 * verify has to surface as a failure instead of a cheerful "Saved" over a
 * résumé that was never attached.
 *
 * The token is the only accepted way to name a file. It is signed, carries the
 * uploader, and expires, so a client cannot point this column at a URL of its
 * choosing — which matters because the download routes fetch whatever is stored
 * here, server-side.
 *
 * Removing a résumé clears the columns and leaves the blob where it is.
 * Applications carry a snapshot of the URL they were sent with, so deleting the
 * object would empty out documents employers already received. Clearing the
 * columns is what revokes access — every route that serves the file reads them
 * first.
 */
function resolveResume(
  values: ApplicantSectionValues["resume"],
  userId: string,
): Prisma.ApplicantUpdateInput | null {
  // Removal wins when both arrive: the request is contradictory, and taking a
  // résumé down is the half of it that must never quietly not happen.
  if (values.removeResume) {
    return { resumeUrl: null, resumeName: null, resumeUploadedAt: null };
  }

  if (!values.resumeToken) return {};

  const stored = resolveResumeUpload(values.resumeToken, userId);
  if (!stored) return null;

  return {
    resumeUrl: stored.url,
    resumeName: stored.name,
    resumeUploadedAt: new Date(),
  };
}
