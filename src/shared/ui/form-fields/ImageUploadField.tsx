"use client";

import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";

import { useFileUpload } from "@/shared/lib/use-file-upload";
import { cn } from "@/shared/lib/utils";
import { Button, buttonVariants } from "@/shared/ui/button";
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { ProgressBar } from "@/shared/ui/ProgressBar";

interface ImageUploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  /** Holds the signed reference the endpoint returns, not the file. */
  name: Path<T>;
  label: string;
  /** Route handler the image is posted to. */
  endpoint: string;
  accept: string;
  /** What is already stored, so the field opens showing the current picture. */
  currentUrl?: string | null;
  /** Initials, shown in the frame when there is no image at all. */
  fallback?: string;
  /** `circle` for a person, `square` for a company. */
  shape?: "circle" | "square";
  description?: string;
  /** Rejects a file in the browser before the bytes go over the wire. */
  validate?: (file: File) => string | null;
  disabled?: boolean;
  className?: string;
}

/**
 * An image field that uploads as soon as a file is chosen, shows what was
 * chosen, and hands the form a reference to what was stored.
 *
 * The split matters. Uploading on selection is what makes progress meaningful —
 * there is a request to report on — while the form still submits on Save, so
 * choosing a picture and walking away changes nothing.
 *
 * The preview is a local object URL, not the stored one. It appears the instant
 * the file is picked rather than after the round trip, which is what makes the
 * bar read as *this picture* going up rather than as an unrelated wait, and it
 * costs no second download of bytes the browser already holds.
 *
 * The field's value is the signed token, never the `File`: a Server Action
 * cannot carry a `File` at all, and its 1MB body limit would rule this out even
 * if it could.
 *
 * The trigger is a `<label>` rather than a button driving a hidden input. A
 * real input stays in the tab order and opens the picker from the keyboard on
 * its own, so there is nothing to reimplement — it is only moved off screen,
 * with its focus ring borrowed by the label through `peer-focus-visible`.
 */
export const ImageUploadField = <T extends FieldValues>({
  control,
  name,
  label,
  endpoint,
  accept,
  currentUrl,
  fallback,
  shape = "circle",
  description,
  validate,
  disabled = false,
  className,
}: ImageUploadFieldProps<T>) => {
  const { field } = useController({ control, name });
  const { upload, reset, status, progress, error } = useFileUpload<{
    token: string;
  }>(endpoint);

  const inputId = useId();
  const [preview, setPreview] = useState<string | null>(null);
  const [rejected, setRejected] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  // An object URL is a document-lifetime reference to the file's bytes. Without
  // this the browser holds on to every image the user cycled through until the
  // page is closed.
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  function clear() {
    reset();
    setPreview(null);
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
      setPreview(null);
      setRejected(rejection);
      // A rejected file is not a pending change, and leaving a stale token here
      // would save the previous upload under the guise of this one.
      field.onChange(undefined);
      return;
    }

    setRejected(null);
    setPreview(URL.createObjectURL(file));

    const result = await upload(file);

    // `null` is a failure or an abort; either way there is nothing to attach,
    // and `error` already carries the reason.
    field.onChange(result?.token);
  }

  const busy = status === "uploading";
  const message = rejected ?? error;
  const shown = preview ?? currentUrl ?? null;
  const isCircle = shape === "circle";

  return (
    <FormItem className={cn("grow", className)}>
      <FormLabel>{label}</FormLabel>

      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-border bg-muted",
            isCircle ? "rounded-full" : "rounded-xl",
          )}
        >
          {shown ? (
            // A plain `img`, not `next/image`: the source is either an object
            // URL, which the optimizer cannot fetch at all, or a blob host
            // there is nothing useful to do to at 80px.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={shown}
              alt=""
              className={cn(
                "h-full w-full object-cover transition-opacity",
                busy && "opacity-40",
              )}
            />
          ) : (
            <span className="text-md font-semibold text-muted-foreground">
              {fallback || <ImageIcon size={20} aria-hidden="true" />}
            </span>
          )}

          {busy && (
            <Loader2
              size={20}
              aria-hidden="true"
              className="absolute animate-spin text-foreground"
            />
          )}
        </div>

        <div className="flex min-w-0 grow flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              id={inputId}
              accept={accept}
              ref={input}
              disabled={disabled || busy}
              className="peer sr-only"
              onChange={(event) => void onSelect(event.target.files?.[0])}
            />
            <label
              htmlFor={inputId}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "cursor-pointer gap-2 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                (disabled || busy) && "pointer-events-none opacity-50",
              )}
            >
              <Upload size={14} aria-hidden="true" />
              {shown ? "Change" : "Upload"}
              <span className="sr-only"> {label}</span>
            </label>

            {preview && !busy && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clear}
                className="gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <X size={14} aria-hidden="true" />
                Undo
                <span className="sr-only"> {label} change</span>
              </Button>
            )}
          </div>

          {busy ? (
            <div className="flex flex-col gap-1.5">
              <ProgressBar value={progress} label={`Uploading ${label}`} />
              <p className="text-xs tabular-nums text-muted-foreground">
                {progress}%
              </p>
            </div>
          ) : (
            status === "done" && (
              <p className="text-xs text-feature">
                Uploaded — save to apply it
              </p>
            )
          )}
        </div>
      </div>

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
