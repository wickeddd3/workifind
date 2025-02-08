"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import { Control, FieldValues, Path } from "react-hook-form";

interface RichTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures the name matches a key in the form schema
  label: string;
}

export const RichTextField = <T extends FieldValues>({
  control,
  name,
  label,
}: RichTextFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field: { value, onChange, ref } }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <RichTextEditor
            initialState={value}
            onChange={(draft) => onChange(draftToMarkdown(draft))}
            ref={ref}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
