"use client";

import { type RefObject, useCallback, useRef, useState } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";

/** Is there an error at or below this field? `errors.skills` covers `skills.2.name`. */
function hasErrorAt(errors: FieldErrors, path: string) {
  return (
    path
      .split(".")
      .reduce<unknown>(
        (node, key) =>
          node && typeof node === "object"
            ? (node as Record<string, unknown>)[key]
            : undefined,
        errors,
      ) !== undefined
  );
}

/**
 * One screen of a long form.
 *
 * `fields` is what makes the step a step rather than a heading: it is the set
 * the wizard validates before letting anyone past, so an error is raised where
 * the field is on screen instead of at the end, next to a submit button three
 * screens away from whatever is wrong.
 */
export interface WizardStep<T extends FieldValues> {
  /** Stable key. Also names the panel's heading element. */
  id: string;
  /** One or two words — it has to sit under a dot on the stepper. */
  label: string;
  /** What the step asks for, shown as the panel heading. */
  title: string;
  hint?: string;
  fields: readonly Path<T>[];
}

export interface FormWizard<T extends FieldValues> {
  step: WizardStep<T>;
  index: number;
  /** The furthest step reached, so the stepper knows what is revisitable. */
  furthest: number;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  goNext: () => Promise<boolean>;
  goBack: () => void;
  goTo: (target: number) => Promise<boolean>;
  /**
   * Pass as `handleSubmit`'s invalid handler. The final submit validates the
   * whole form, and anything it rejects from an earlier step would otherwise
   * fail invisibly — the field is not on screen to show its message.
   */
  goToFirstInvalid: (errors: FieldErrors<T>) => void;
  /** Put this on the wizard's outermost element so navigation can scroll to it. */
  containerRef: RefObject<HTMLDivElement>;
}

/**
 * Splits one `react-hook-form` form across several steps.
 *
 * The form itself stays whole — one `useForm`, one resolver, one submit. Only
 * the rendering is split, so nothing has to be stitched back together and a
 * field's value survives stepping away from it (`shouldUnregister` is off by
 * default, so unmounted inputs keep what was typed into them).
 *
 * Navigation is the only thing that validates. Submitting is left to the
 * caller's last step, which is why `handleSubmit` never sees a half-filled
 * form: everything before it has already been triggered on the way past.
 */
export function useFormWizard<T extends FieldValues>({
  form,
  steps,
}: {
  form: UseFormReturn<T>;
  steps: readonly WizardStep<T>[];
}): FormWizard<T> {
  const [index, setIndex] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { trigger } = form;

  const scrollToWizard = useCallback(() => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const goTo = useCallback(
    async (target: number) => {
      const clamped = Math.max(0, Math.min(target, steps.length - 1));
      if (clamped === index) return true;

      // Backwards is free. Nothing is lost by leaving a step half-answered when
      // the wizard will validate it again on the way forward.
      if (clamped < index) {
        setIndex(clamped);
        scrollToWizard();
        return true;
      }

      // Forwards, every step being skipped over has to hold up — jumping from
      // the stepper must not be a way around the checks Continue performs.
      for (let step = index; step < clamped; step++) {
        const valid = await trigger(steps[step].fields, { shouldFocus: true });
        if (!valid) {
          setIndex(step);
          scrollToWizard();
          return false;
        }
      }

      setIndex(clamped);
      setFurthest((reached) => Math.max(reached, clamped));
      scrollToWizard();
      return true;
    },
    [index, scrollToWizard, steps, trigger],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  const goBack = useCallback(() => {
    void goTo(index - 1);
  }, [goTo, index]);

  const goToFirstInvalid = useCallback(
    (errors: FieldErrors<T>) => {
      const failing = steps.findIndex((candidate) =>
        candidate.fields.some((field) => hasErrorAt(errors, field)),
      );
      if (failing === -1 || failing === index) return;
      setIndex(failing);
      scrollToWizard();
    },
    [index, scrollToWizard, steps],
  );

  return {
    step: steps[index],
    index,
    furthest,
    total: steps.length,
    isFirst: index === 0,
    isLast: index === steps.length - 1,
    goNext,
    goBack,
    goTo,
    goToFirstInvalid,
    containerRef,
  };
}
