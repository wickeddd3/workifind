"use server";

import type { Employer } from "@prisma/client";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

import { getEmployer } from "@/entities/employer/queries";
import { requireRole } from "@/shared/lib/clerk.server";
import { toSlug } from "@/shared/utils/format-text";

import { mapEmployerSection } from "../model/map-employer-data";
import {
  EMPLOYER_SECTION_SCHEMAS,
  type EmployerSectionPayload,
} from "../model/schema";
import { updateEmployer } from "./employer.service";
import { uploadEmployerLogo } from "./logo.service";

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
        ? await resolveIdentityExtras(parsed.data as IdentityValues, current)
        : {};

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

type IdentityValues = { companyName: string; companyLogo?: File };

/**
 * The two identity columns that are derived rather than submitted.
 *
 * The slug is re-cut only when the company name actually changes. It used to be
 * regenerated on every save — with a fresh nanoid suffix each time — so editing
 * a perk silently moved the company's public URL and broke every link to it.
 *
 * The logo is only replaced when a new file uploaded successfully; omitting the
 * field leaves the existing `companyLogoUrl` alone instead of wiping it.
 */
async function resolveIdentityExtras(
  values: IdentityValues,
  current: { companyName: string },
) {
  const extras: { slug?: string; companyLogoUrl?: string } = {};

  if (values.companyName.trim() !== current.companyName.trim()) {
    extras.slug = `${toSlug(values.companyName)}-${nanoid(10)}`;
  }

  if (values.companyLogo) {
    const imageUrl = await uploadEmployerLogo(values.companyLogo);
    if (imageUrl) extras.companyLogoUrl = imageUrl;
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
