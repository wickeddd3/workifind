"use client";

import { PlusIcon, XIcon } from "lucide-react";
import {
  type Control,
  Controller,
  type FieldArrayWithId,
  type FieldValues,
  type Path,
  type UseFieldArrayRemove,
} from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { FormControl, FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

interface DynamicListFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures the name matches a key in the form schema
  label: string;
  fields: FieldArrayWithId<T, T[keyof T]>[]; // Dynamically handle the object structure for the field array
  append: () => void;
  remove: UseFieldArrayRemove;
}

export const DynamicListField = <T extends FieldValues>({
  control,
  name,
  label,
  fields,
  append,
  remove,
}: DynamicListFieldProps<T>) => (
  <div className="flex flex-col gap-3">
    <FormLabel>{label}</FormLabel>
    {fields.map((field, index) => (
      <FormItem key={field.id} className="flex flex-row items-center space-y-0">
        <FormControl>
          <Controller
            control={control}
            name={`${name}.${index}.name` as Path<T>}
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
        <Button
          variant="link"
          size="icon"
          type="button"
          aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}
          onClick={() => remove(index)}
        >
          <XIcon size="16px" aria-hidden="true" />
        </Button>
      </FormItem>
    ))}
    <Button
      type="button"
      variant="link"
      size="sm"
      className="flex items-center gap-2 self-start px-0"
      onClick={append}
    >
      <PlusIcon size="16px" aria-hidden="true" />
      <span className="text-xs">Add {label.toLowerCase()}</span>
    </Button>
  </div>
);
