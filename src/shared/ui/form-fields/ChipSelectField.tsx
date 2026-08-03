"use client";

import { type Control, type FieldValues, type Path } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";

interface ChipSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { label: string; value: string }[];
  /** Multi-select writes an array of the chosen values; single writes one. */
  multiple?: boolean;
  className?: string;
}

/**
 * A set of options chosen by tapping them, rather than by ticking boxes in a
 * column.
 *
 * Used where the options are short, few, and read as tags on the profile — the
 * employment types and work settings an applicant will take. Rendering them as
 * chips means the editor shows the same shapes the profile does, and two
 * adjacent groups stop looking like one undifferentiated wall of checkboxes.
 *
 * A real `input` sits behind every chip, visually hidden rather than replaced:
 * keyboard focus, arrow-key movement within a radio group, and the checked
 * state a screen reader announces are all things the browser already does
 * correctly, and a div with a click handler would have to reimplement.
 */
export const ChipSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  multiple = false,
  className,
}: ChipSelectFieldProps<T>) => (
  // `FormField`, not a bare `Controller`: it supplies the context `FormMessage`
  // reads, and without it a validation error on this field renders as nothing
  // at all.
  <FormField
    control={control}
    name={name}
    render={({ field }) => {
      const selected = multiple
        ? (field.value as string[]) ?? []
        : field.value
          ? [String(field.value)]
          : [];

      function toggle(value: string, checked: boolean) {
        if (!multiple) return field.onChange(value);

        const next = checked
          ? [...selected, value]
          : selected.filter((item) => item !== value);

        field.onChange(next);
      }

      return (
        <FormItem className={cn("space-y-2", className)}>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => {
              const isSelected = selected.includes(option.value);

              return (
                <label key={option.value} className="cursor-pointer">
                  <input
                    type={multiple ? "checkbox" : "radio"}
                    name={name}
                    value={option.value}
                    checked={isSelected}
                    onChange={(event) =>
                      toggle(option.value, event.target.checked)
                    }
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                      // The ring is driven off the hidden input's focus so the
                      // chip shows focus without the input being visible.
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
          <FormMessage />
        </FormItem>
      );
    }}
  />
);
