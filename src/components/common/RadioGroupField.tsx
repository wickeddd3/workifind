"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

interface RadioGroupFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures the name matches a key in the form schema
  label: string;
  options: { id: string; value: string; label: string }[];
  className?: string;
}

export const RadioGroupField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  className,
}: RadioGroupFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn("space-y-3", className)}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <RadioGroup
            value={field.value ? String(field.value) : ""} // Ensure value is a string
            onValueChange={field.onChange}
            className="flex flex-wrap gap-6"
          >
            {options.map(({ id, value, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <RadioGroupItem value={String(value)} id={id} />
                {/* Ensure value is a string */}
                <FormLabel htmlFor={id} className="font-normal">
                  {label}
                </FormLabel>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
