"use client";

import { CheckCircle2, Paperclip, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";

import { useFileUpload } from "@/shared/lib/use-file-upload";
import { cn } from "@/shared/lib/utils";
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { ProgressBar } from "@/shared/ui/ProgressBar";

interface UploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  /** Holds the signed reference the endpoint returns, not the file. */
  name: Path<T>;
  label: string;
  /** Route handler the file is posted to. */
  endpoint: string;
  accept: string;
  description?: string;
  /** Rejects a file in the browser before 4MB goes over the wire. */
  validate?: (file: File) => string | null;
  disabled?: boolean;
  className?: string;
}

/**
 * A file field that uploads as soon as a file is chosen, then hands the form a
 * reference to what was stored.
 *
 * The split matters. Uploading on selection is what makes progress meaningful —
 * there is a request to report on — while the form still submits on Save, so
 * choosing a file and walking away changes nothing. Nothing is attached to a
 * record until the section is saved.
 *
 * The field's value is the signed token, never the `File`: a Server Action
 * cannot carry a `File` at all, and its 1MB body limit would rule this out even
 * if it could.
 */
export const UploadField = <T extends FieldValues>({
  control,
  name,
  label,
  endpoint,
  accept,
  description,
  validate,
  disabled = false,
  className,
}: UploadFieldProps<T>) => {
  const { field } = useController({ control, name });
  const { upload, reset, status, progress, error } = useFileUpload<{
    token: string;
    name: string;
  }>(endpoint);

  const [fileName, setFileName] = useState<string | null>(null);
  const [rejected, setRejected] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  function clear() {
    reset();
    setFileName(null);
    setRejected(null);
    // The native input keeps its selection after a clear, so re-choosing the
    // same file would fire no `change` event and appear to do nothing.
    if (input.current) input.current.value = "";
    field.onChange(undefined);
  }

  async function onSelect(file: File | undefined) {
    if (!file) {
      clear();
      return;
    }

    const rejection = validate?.(file);
    if (rejection) {
      reset();
      setFileName(null);
      setRejected(rejection);
      // Marks the form dirty-free again: a rejected file is not a pending
      // change, and leaving a stale token here would save the previous upload.
      field.onChange(undefined);
      return;
    }

    setRejected(null);
    setFileName(file.name);

    const result = await upload(file);

    // `null` is a failure or an abort; either way there is nothing to attach,
    // and `error` already carries the reason.
    field.onChange(result?.token);
  }

  const busy = status === "uploading";
  const message = rejected ?? error;

  return (
    <FormItem className={cn("grow", className)}>
      <FormLabel>{label}</FormLabel>

      <Input
        type="file"
        accept={accept}
        disabled={disabled || busy}
        ref={input}
        onChange={(event) => void onSelect(event.target.files?.[0])}
      />

      {busy && fileName && (
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Paperclip size={13} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{fileName}</span>
            <span className="tabular ml-auto shrink-0">{progress}%</span>
          </div>
          <ProgressBar value={progress} label={`Uploading ${fileName}`} />
        </div>
      )}

      {status === "done" && fileName && (
        <div className="flex items-center gap-2 pt-1 text-xs text-feature">
          <CheckCircle2 size={13} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{fileName} uploaded</span>
          <span className="ml-auto shrink-0 text-muted-foreground">
            Save to attach it
          </span>
          <button
            type="button"
            onClick={clear}
            className="shrink-0 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={13} aria-hidden="true" />
            <span className="sr-only">Remove {fileName}</span>
          </button>
        </div>
      )}

      {description && <FormDescription>{description}</FormDescription>}

      {/* The upload's own failure, which the resolver knows nothing about —
          `FormMessage` only renders what validation put there. */}
      {message && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {message}
        </p>
      )}
      <FormMessage />
    </FormItem>
  );
};
