"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";
import type { ZodType } from "zod";

import { useToast } from "@/shared/ui/use-toast";

/** How long the "Saved" acknowledgement stays up before fading out. */
const SAVED_NOTICE_MS = 2600;

export interface SectionSaveResult {
  success: boolean;
  message: string;
}

/**
 * Form state for one section of a profile editor.
 *
 * Each section owns a form, so a validation error is scoped to the card it
 * belongs to, and `isDirty` is per section — which is what lets a Save button
 * stay disabled until that section in particular has changed.
 *
 * The save itself is injected: the applicant and employer editors post to
 * different server actions, but the surrounding behaviour — validate, save,
 * toast on failure, reset, acknowledge, refresh — is the same in both, and
 * duplicating it is how the two ended up handling failure differently.
 */
export function useSectionForm<TValues extends FieldValues>({
  schema,
  defaultValues,
  save,
  getResetValues,
}: {
  schema: ZodType<TValues>;
  defaultValues: DefaultValues<TValues>;
  save: (values: TValues) => Promise<SectionSaveResult>;
  /**
   * What the form is reset to after a successful save. Defaults to the values
   * submitted; a section holding a file input overrides it so the upload is not
   * resubmitted on the next save.
   */
  getResetValues?: (values: TValues) => DefaultValues<TValues>;
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
    const response = await save(values);

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
    form.reset(getResetValues ? getResetValues(values) : values);
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
