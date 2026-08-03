"use client";

import { PlusIcon, Trash2, XIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/shared/ui/button";

/**
 * A list of records inside one section — a job held, a degree taken, a skill,
 * a language.
 *
 * `DynamicListField` covers a list of bare names and stays one row per item.
 * This covers anything with more than one field per entry, and the caller
 * supplies those fields through `children`, which is passed the entry's index so
 * it can build the `name` paths (`skills.0.level`). The component therefore
 * knows nothing about what it is repeating.
 *
 * Two layouts, because the records differ in weight:
 *
 * - `block` gives each entry a bordered panel with its own numbered legend. A
 *   role carries seven fields, and run as flat rows there was no seeing where
 *   one ended and the next began.
 * - `row` keeps each entry on one line. A CV lists three jobs but fifteen
 *   skills, and fifteen bordered panels is a page nobody scrolls to the end of.
 */
export function RepeatableFieldset({
  itemLabel,
  emptyPrompt,
  fields,
  onAdd,
  onRemove,
  variant = "block",
  children,
}: {
  /** Singular and lowercase — used for "Add role" and the Remove labels. */
  itemLabel: string;
  emptyPrompt: string;
  /** `useFieldArray`'s fields; only the stable `id` is read. */
  fields: { id: string }[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  variant?: "block" | "row";
  children: (index: number) => ReactNode;
}) {
  const isRow = variant === "row";

  return (
    <div className={isRow ? "flex flex-col gap-3" : "flex flex-col gap-4"}>
      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">{emptyPrompt}</p>
      )}

      {fields.map((field, index) =>
        isRow ? (
          <div key={field.id} className="flex items-start gap-2">
            <div className="grow">{children(index)}</div>
            <Button
              variant="link"
              size="icon"
              type="button"
              // Clears the field label and its 8px gap so the button lines up
              // with the inputs beside it rather than with their captions.
              className="mt-7 shrink-0 text-muted-foreground hover:text-destructive"
              aria-label={`Remove ${itemLabel} ${index + 1}`}
              onClick={() => onRemove(index)}
            >
              <XIcon size={16} aria-hidden="true" />
            </Button>
          </div>
        ) : (
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
        ),
      )}

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
