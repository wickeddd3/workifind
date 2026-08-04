"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Post a file to a route handler and watch it go up.
 *
 * `XMLHttpRequest` rather than `fetch`, and that is the whole reason this
 * exists: `fetch` still has no way to observe request-body progress in any
 * shipping browser, so a fetch-based upload can only show a spinner. On a
 * multi-megabyte file over a slow connection, a spinner and a hang look
 * identical.
 *
 * The upload is aborted if the component unmounts or a second file is chosen,
 * so a slow first upload cannot land after a faster second one and overwrite
 * the reference the form is holding.
 */

export type UploadStatus = "idle" | "uploading" | "done" | "error";

/** What the server sent back, once it parsed. */
type UploadResponse = Record<string, unknown>;

export function useFileUpload<T extends UploadResponse>(endpoint: string) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const request = useRef<XMLHttpRequest>();

  const abort = useCallback(() => {
    request.current?.abort();
    request.current = undefined;
  }, []);

  useEffect(() => abort, [abort]);

  const reset = useCallback(() => {
    abort();
    setStatus("idle");
    setProgress(0);
    setError(null);
  }, [abort]);

  const upload = useCallback(
    (file: File) =>
      new Promise<T | null>((resolve) => {
        abort();

        const xhr = new XMLHttpRequest();
        request.current = xhr;

        setStatus("uploading");
        setProgress(0);
        setError(null);

        xhr.upload.addEventListener("progress", (event) => {
          if (!event.lengthComputable) return;
          // Held just under 100 while the request is still open: the bytes
          // being sent is not the same as the server having accepted them, and
          // a bar that sits at 100% through the storage round trip reads as
          // stuck.
          setProgress(
            Math.min(99, Math.round((event.loaded / event.total) * 99)),
          );
        });

        function fail(message: string) {
          setStatus("error");
          setError(message);
          resolve(null);
        }

        xhr.addEventListener("load", () => {
          let body: Partial<T> & { message?: string } = {};
          try {
            body = JSON.parse(xhr.responseText) as Partial<T> & {
              message?: string;
            };
          } catch (parseError) {
            // An HTML error page, most likely. Fall through to the status check
            // with an empty body rather than throwing out of an event handler.
          }

          if (xhr.status < 200 || xhr.status >= 300) {
            fail(body.message ?? "Upload failed. Please try again.");
            return;
          }

          setProgress(100);
          setStatus("done");
          resolve(body as T);
        });

        xhr.addEventListener("error", () =>
          fail("Upload failed. Check your connection and try again."),
        );
        xhr.addEventListener("abort", () => {
          // A deliberate cancellation: leave the state to whoever called it,
          // and resolve so the caller is not left waiting on a dead promise.
          resolve(null);
        });

        const formData = new FormData();
        formData.append("file", file);

        xhr.open("POST", endpoint);
        xhr.send(formData);
      }),
    [abort, endpoint],
  );

  return { upload, abort, reset, status, progress, error };
}
