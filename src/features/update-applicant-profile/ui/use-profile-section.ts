"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";
import type { ZodType } from "zod";

import { useToast } from "@/shared/ui/use-toast";

import { updateApplicantSectionAction } from "../api/applicant.action";
import type {
  ApplicantSection,
  ApplicantSectionPayload,
} from "../model/schema";

/** How long the "Saved" acknowledgement stays up before fading out. */
const SAVED_NOTICE_MS = 2600;

/**
 * Form state for one section of the profile.
 *
 * Each section owns a form, so a validation error is scoped to the card it
 * belongs to, and `isDirty` is per section — which is what lets a Save button
 * stay disabled until that section in particular has changed.
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
  const router = useRouter();
  const { toast } = useToast();
  const [justSaved, setJustSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const form = useForm<TValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onSubmit(values: TValues) {
    // The payload union is discriminated on `section`, which the caller fixes;
    // the values are already validated against that section's schema by the
    // resolver, and re-validated server-side.
    const response = await updateApplicantSectionAction({
      section,
      values,
    } as ApplicantSectionPayload);

    if (!response.success) {
      // Previously a failed save did nothing at all — no toast, no message, the
      // form simply sat there.
      toast({
        variant: "destructive",
        title: "Couldn't save",
        description: response.message,
      });
      return;
    }

    // Reset to the submitted values so the form is clean again and Save
    // disables until something changes.
    form.reset(values);
    setJustSaved(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustSaved(false), SAVED_NOTICE_MS);

    // Refresh so the profile page and the completeness meter reflect the write.
    router.refresh();
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isDirty: form.formState.isDirty,
    isSubmitting: form.formState.isSubmitting,
    justSaved: justSaved && !form.formState.isDirty,
  };
}
