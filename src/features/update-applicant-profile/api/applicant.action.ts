"use server";

import type { Applicant } from "@prisma/client";

import { requireRole } from "@/shared/lib/clerk.server";

import { mapApplicantSection } from "../model/map-applicant-data";
import {
  APPLICANT_SECTION_SCHEMAS,
  type ApplicantSectionPayload,
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

    const applicant = await updateApplicant(userId, data);
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
