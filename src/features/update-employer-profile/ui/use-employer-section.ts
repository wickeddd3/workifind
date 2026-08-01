"use client";

import type { DefaultValues, FieldValues } from "react-hook-form";
import type { ZodType } from "zod";

import { useSectionForm } from "@/shared/lib/use-section-form";

import { updateEmployerSectionAction } from "../api/employer.action";
import type { EmployerSection, EmployerSectionPayload } from "../model/schema";

/**
 * The shared section form, bound to the company profile's save action.
 *
 * Only the binding lives here: the form behaviour is the same as the applicant
 * editor's and is kept in one place.
 */
export function useEmployerSection<TValues extends FieldValues>({
  section,
  schema,
  defaultValues,
  getResetValues,
}: {
  section: EmployerSection;
  schema: ZodType<TValues>;
  defaultValues: DefaultValues<TValues>;
  getResetValues?: (values: TValues) => DefaultValues<TValues>;
}) {
  return useSectionForm<TValues>({
    schema,
    defaultValues,
    getResetValues,
    // The payload union is discriminated on `section`, which the caller fixes;
    // the values are already validated against that section's schema by the
    // resolver, and re-validated server-side.
    save: (values) =>
      updateEmployerSectionAction({
        section,
        values,
      } as EmployerSectionPayload),
  });
}
