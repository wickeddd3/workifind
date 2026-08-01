"use client";

import type { DefaultValues, FieldValues } from "react-hook-form";
import type { ZodType } from "zod";

import { useSectionForm } from "@/shared/lib/use-section-form";

import { updateApplicantSectionAction } from "../api/applicant.action";
import type {
  ApplicantSection,
  ApplicantSectionPayload,
} from "../model/schema";

/**
 * The shared section form, bound to the applicant's save action.
 *
 * Only the binding lives here: the form behaviour is the same as the employer
 * editor's and is kept in one place.
 */
export function useProfileSection<TValues extends FieldValues>({
  section,
  schema,
  defaultValues,
}: {
  section: ApplicantSection;
  schema: ZodType<TValues>;
  defaultValues: DefaultValues<TValues>;
}) {
  return useSectionForm<TValues>({
    schema,
    defaultValues,
    // The payload union is discriminated on `section`, which the caller fixes;
    // the values are already validated against that section's schema by the
    // resolver, and re-validated server-side.
    save: (values) =>
      updateApplicantSectionAction({
        section,
        values,
      } as ApplicantSectionPayload),
  });
}
