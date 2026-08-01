"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { LoadingButton } from "@/shared/ui/LoadingButton";

/**
 * The shell every profile section shares: a heading, its fields, and a Save
 * that belongs to that section alone.
 *
 * `id` doubles as the scroll anchor the completeness prompts link to, so
 * "Add your skills" lands on the skills card.
 */
export function ProfileSectionCard({
  id,
  title,
  description,
  isDirty,
  isSubmitting,
  justSaved,
  onSubmit,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  isDirty: boolean;
  isSubmitting: boolean;
  justSaved: boolean;
  onSubmit: (event: React.FormEvent) => void;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      // Clears the sticky navbar when linked to from a completeness prompt.
      className="scroll-mt-24 rounded-2xl border border-border bg-card shadow-card"
    >
      <form noValidate onSubmit={onSubmit}>
        <div className="flex flex-wrap items-start justify-between gap-3 p-5 pb-0 md:p-6 md:pb-0">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-md font-semibold text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {justSaved && (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-feature"
                role="status"
              >
                <Check size={14} aria-hidden="true" />
                Saved
              </span>
            )}
            {isDirty && !isSubmitting && (
              <span className="text-xs font-semibold text-warn-subtle-foreground">
                Unsaved
              </span>
            )}
            <LoadingButton
              type="submit"
              size="sm"
              loading={isSubmitting}
              // Nothing to write until this section changes, and a disabled
              // Save is how the user knows the section is already stored.
              disabled={!isDirty}
            >
              Save
            </LoadingButton>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5 md:p-6">{children}</div>
      </form>
    </section>
  );
}
