"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { LoadingButton } from "@/shared/ui/LoadingButton";

/**
 * The bar a wizard is driven from.
 *
 * Sticky, because a step can be taller than the viewport and a Continue button
 * that has to be scrolled to is a step people think they are stuck on. The
 * negative margins bleed it to the edges of the card it sits in, so the rule
 * above it reads as the card's own divider rather than a floating line — they
 * assume the card's `p-5 md:p-6`.
 *
 * Forward movement is a real form submit rather than a click handler: that way
 * pressing Enter in a text field does what it does on any other form, and the
 * caller decides in one place whether a submit means "next step" or "done".
 */
export function WizardNav({
  isLast,
  isSubmitting,
  backLabel,
  onBack,
  nextLabel = "Continue",
  submitLabel = "Create profile",
}: {
  isLast: boolean;
  isSubmitting: boolean;
  backLabel: string;
  /** Omitted when there is nowhere to go back to — the button then stays put, disabled, so the bar keeps its shape. */
  onBack?: () => void;
  nextLabel?: string;
  submitLabel?: string;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-5 -mb-5 flex items-center justify-between gap-3 rounded-b-2xl border-t border-border bg-card/95 px-5 py-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 md:-mx-6 md:-mb-6 md:px-6">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        disabled={!onBack || isSubmitting}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon size={16} aria-hidden="true" />
        {backLabel}
      </Button>

      {isLast ? (
        <LoadingButton type="submit" loading={isSubmitting}>
          {submitLabel}
        </LoadingButton>
      ) : (
        <Button type="submit" className="gap-2">
          {nextLabel}
          <ArrowRightIcon size={16} aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
