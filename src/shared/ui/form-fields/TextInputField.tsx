"use client";

import { type Control, type FieldValues, type Path } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

interface TextInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures the name matches a key in the form schema
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  /** For a field another answer has made moot, e.g. the end date of an
   *  ongoing role. */
  disabled?: boolean;
  /** A unit shown inside the field, e.g. "$". Decoration only — it is not part
   *  of the value, and is hidden from screen readers, which get the label. */
  prefix?: string;
  /** Keeps the label for screen readers but takes it off the screen. For a
   *  field inside a repeating list whose group heading already names it, where
   *  showing it would read "Locations / Location / Location". */
  labelHidden?: boolean;
}

export const TextInputField = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  className,
  disabled,
  prefix,
  labelHidden,
}: TextInputFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn("grow", className)}>
        <FormLabel className={cn(labelHidden && "sr-only")}>{label}</FormLabel>
        <FormControl>
          <div className="relative">
            {prefix && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground"
              >
                {prefix}
              </span>
            )}
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(prefix && "pl-7")}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
