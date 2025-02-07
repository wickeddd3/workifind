"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures the name matches a key in the form schema
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const TextInputField = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  className,
}: TextInputFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn("grow", className)}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} type={type} placeholder={placeholder} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
