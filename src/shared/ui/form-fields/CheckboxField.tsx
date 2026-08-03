"use client";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/shared/ui/form";

interface CheckboxFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
}

/**
 * A single boolean, as opposed to `CheckboxGroupField`, which writes an array
 * of the options the user picked. Used for the "I currently work here" toggle
 * that decides whether a record has an end date at all.
 */
export const CheckboxField = <T extends FieldValues>({
  control,
  name,
  label,
  className,
}: CheckboxFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem
        className={cn("flex flex-row items-center gap-3 space-y-0", className)}
      >
        <FormControl>
          <Checkbox
            checked={Boolean(field.value)}
            onCheckedChange={(checked) => field.onChange(checked === true)}
          />
        </FormControl>
        <FormLabel className="font-normal">{label}</FormLabel>
      </FormItem>
    )}
  />
);
