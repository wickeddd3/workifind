"use client";

import { PlusIcon, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/shared/ui/button";

/**
 * A list of multi-field records inside one section — a job held, a degree
 * taken, a certificate earned.
 *
 * `DynamicListField` covers the other shape, a list of bare names, and stays
 * one row per item. These records carry six or seven fields each, so every
 * entry gets its own bordered block with its own Remove; running them as flat
 * rows made it impossible to see where one role ended and the next began.
 *
 * The fields themselves come from the caller via `children`, which is passed
 * the entry's index so it can build the `name` paths (`experiences.0.title`).
 * The component therefore knows nothing about what it is repeating.
 */
export function RepeatableFieldset({
  itemLabel,
  emptyPrompt,
  fields,
  onAdd,
  onRemove,
  children,
}: {
  /** Singular and lowercase — used for "Add role" and the Remove labels. */
  itemLabel: string;
  emptyPrompt: string;
  /** `useFieldArray`'s fields; only the stable `id` is read. */
  fields: { id: string }[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  children: (index: number) => ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">{emptyPrompt}</p>
      )}

      {fields.map((field, index) => (
        <fieldset
          key={field.id}
          className="flex flex-col gap-4 rounded-xl border border-border p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {itemLabel} {index + 1}
            </legend>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(index)}
            >
              <Trash2 size={14} aria-hidden="true" />
              Remove
              <span className="sr-only">
                {" "}
                {itemLabel} {index + 1}
              </span>
            </Button>
          </div>

          {children(index)}
        </fieldset>
      ))}

      <Button
        type="button"
        variant="link"
        size="sm"
        className="flex items-center gap-2 self-start px-0"
        onClick={onAdd}
      >
        <PlusIcon size={16} aria-hidden="true" />
        <span className="text-xs">Add {itemLabel}</span>
      </Button>
    </div>
  );
}
