"use server";

import type { Employer } from "@prisma/client";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

import { resolveLogoUpload } from "@/entities/employer";
import { getEmployer } from "@/entities/employer/queries";
import { requireRole } from "@/shared/lib/clerk.server";
import { toSlug } from "@/shared/utils/format-text";

import { mapEmployerSection } from "../model/map-employer-data";
import {
  EMPLOYER_SECTION_SCHEMAS,
  type EmployerSectionPayload,
} from "../model/schema";
import { updateEmployer } from "./employer.service";

/**
 * Save one section of the company profile.
 *
 * A single action rather than one per section: authorization and the
 * userId-scoped write are the parts worth not duplicating, and the payload's
 * discriminated union already stops a caller sending perks under the
 * `overview` name.
 */
export async function updateEmployerSectionAction(
  payload: EmployerSectionPayload,
): Promise<{ success: boolean; data: Employer | null; message: string }> {
  try {
    const { userId } = await requireRole("EMPLOYER");

    const schema = EMPLOYER_SECTION_SCHEMAS[payload.section];
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

    const current = await getEmployer(userId);
    if (!current) {
      return { success: false, data: null, message: "No company profile yet" };
    }

    const data = mapEmployerSection(payload.section, parsed.data as never);
    const identity =
      payload.section === "identity"
        ? resolveIdentityExtras(parsed.data as IdentityValues, current, userId)
        : {};

    if (identity === null) {
      return {
        success: false,
        data: null,
        message: "That upload has expired. Please choose the file again.",
      };
    }

    const employer = await updateEmployer(userId, { ...data, ...identity });
    if (!employer) {
      return {
        success: false,
        data: null,
        message: "Could not save. Please try again.",
      };
    }

    revalidateFor(payload.section, current, employer);

    return { success: true, data: employer, message: "Saved" };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Could not save. Please try again.",
    };
  }
}

type IdentityValues = { companyName: string; logoToken?: string };

/**
 * The two identity columns that are derived rather than submitted, or `null`
 * when a reference was submitted that we will not act on.
 *
 * The slug is re-cut only when the company name actually changes. It used to be
 * regenerated on every save — with a fresh nanoid suffix each time — so editing
 * a perk silently moved the company's public URL and broke every link to it.
 *
 * The logo arrives as a signed token, the file itself having gone to the upload
 * route already. No token means no change: this section is saved whenever the
 * company email or website changes, and treating an absent token as "remove the
 * logo" would wipe it on almost every save. A token that does not verify is a
 * failure rather than a silent skip — the previous version dropped a failed
 * upload on the floor and reported "Saved" over a logo that never landed.
 */
function resolveIdentityExtras(
  values: IdentityValues,
  current: { companyName: string },
  userId: string,
): { slug?: string; companyLogoUrl?: string } | null {
  const extras: { slug?: string; companyLogoUrl?: string } = {};

  if (values.companyName.trim() !== current.companyName.trim()) {
    extras.slug = `${toSlug(values.companyName)}-${nanoid(10)}`;
  }

  if (values.logoToken) {
    const url = resolveLogoUpload(values.logoToken, userId);
    if (!url) return null;
    extras.companyLogoUrl = url;
  }

  return extras;
}

/**
 * Everything the company profile is read from elsewhere.
 *
 * `/companies/[slug]` is prerendered, and the name and logo ride along on every
 * job card and job page, so an identity change goes stale in places the
 * employer never visits.
 */
function revalidateFor(
  section: EmployerSectionPayload["section"],
  before: { slug: string },
  after: Employer,
) {
  revalidatePath("/employer/profile");
  revalidatePath(`/companies/${after.slug}`);

  if (section !== "identity") return;

  if (before.slug !== after.slug) {
    revalidatePath(`/companies/${before.slug}`);
    revalidatePath("/sitemap.xml");
  }

  // Company name and logo are shown on every listing.
  revalidatePath("/jobs/[slug]", "page");
  revalidatePath("/jobs");
}
