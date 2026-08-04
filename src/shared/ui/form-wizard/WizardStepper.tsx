"use client";

import { CheckIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { ProgressBar } from "@/shared/ui/ProgressBar";

/**
 * Where you are in a multi-step form, and how much is left.
 *
 * Two presentations of the same state, because the row of dots that reads
 * clearly on a desktop turns into five truncated words on a phone. Narrow
 * screens get the bar and a count; wide screens get the dots, which also serve
 * as navigation back to anything already answered.
 */
export function WizardStepper({
  steps,
  index,
  furthest,
  onStepSelect,
  className,
}: {
  steps: readonly { id: string; label: string }[];
  index: number;
  /** The furthest step reached. Anything past it is not yet navigable. */
  furthest: number;
  onStepSelect: (index: number) => void;
  className?: string;
}) {
  const position = `Step ${index + 1} of ${steps.length}`;

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">
            {steps[index].label}
          </p>
          <p className="text-xs text-muted-foreground">{position}</p>
        </div>
        <ProgressBar
          value={((index + 1) / steps.length) * 100}
          label={position}
        />
      </div>

      <ol className="hidden md:flex md:items-center">
        {steps.map((step, stepIndex) => {
          const isCurrent = stepIndex === index;
          const isDone = stepIndex < index;
          const isReachable = stepIndex <= furthest;

          return (
            <li
              key={step.id}
              className={cn(
                "flex items-center gap-3",
                stepIndex < steps.length - 1 && "flex-1",
              )}
            >
              <button
                type="button"
                disabled={!isReachable || isCurrent}
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => onStepSelect(stepIndex)}
                className="flex items-center gap-2 rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 enabled:hover:text-foreground disabled:cursor-default"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all",
                    isCurrent &&
                      "bg-primary text-primary-foreground ring-4 ring-primary/15",
                    isDone && "bg-primary text-primary-foreground",
                    !isCurrent &&
                      !isDone &&
                      "border border-border bg-card text-muted-foreground",
                  )}
                >
                  {isDone ? <CheckIcon size={14} /> : stepIndex + 1}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </button>

              {stepIndex < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px flex-1 rounded-full transition-colors",
                    isDone ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
