"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

interface CheckboxGroupFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures the name matches a key in the form schema
  label: string;
  options: string[];
  className?: string;
}

export const CheckboxGroupField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  className,
}: CheckboxGroupFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => {
      // Ensure field.value is always an array of strings
      const fieldValue = (field.value as string[]) || [];

      return (
        <FormItem className={cn("space-y-3", className)}>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-wrap gap-6">
            {options.map((item) => (
              <div
                key={item}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    checked={fieldValue.includes(item)}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...fieldValue, item]
                        : fieldValue.filter((value) => value !== item);
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">{item}</FormLabel>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      );
    }}
  />
);
