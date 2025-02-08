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

interface FileUploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures the name matches a key in the form schema
  label: string;
  accept?: string;
  className?: string;
}

export const FileUploadField = <T extends FieldValues>({
  control,
  name,
  label,
  accept = "image/*",
  className,
}: FileUploadFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field: { onChange, ref } }) => (
      <FormItem className={cn("grow", className)}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file);
            }}
            ref={ref}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
