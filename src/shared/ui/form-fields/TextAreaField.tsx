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
import { Textarea } from "@/shared/ui/textarea";

interface TextAreaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

/**
 * Plain multi-line text, as opposed to `RichTextField`, which loads a WYSIWYG
 * editor. Used where the text is a note on one record — what you did in a role,
 * what a course covered — and formatting would be noise; loading the editor per
 * entry would also mean a dozen of them on one page.
 */
export const TextAreaField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 3,
  className,
}: TextAreaFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn("grow", className)}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea {...field} rows={rows} placeholder={placeholder} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
