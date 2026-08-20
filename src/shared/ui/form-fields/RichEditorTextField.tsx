"use client";

import { type Control, type FieldValues, type Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import RichTextEditor from "@/shared/ui/RichTextEditor";

interface RichTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures the name matches a key in the form schema
  label: string;
  placeholder?: string;
}

export const RichTextField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: RichTextFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field: { value, onChange, onBlur, ref } }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {/* The editor emits Markdown, which is what the schemas validate and
              what `shared/ui/Markdown` renders, so the value passes straight
              through — no conversion step in between. */}
          <RichTextEditor
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            ref={ref}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
