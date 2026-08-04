import { toSafeFileName } from "../utils/format-text";
import { logger } from "./logger";

/**
 * Stream a stored file back to the browser as a download.
 *
 * The point of the indirection: blobs are stored with public access, so their
 * URLs are permanent bearer tokens. Route handlers authorize the request, then
 * call this — the URL stays on the server and the browser only ever sees a path
 * it has to be authorized for again on the next request.
 *
 * The body is piped rather than buffered, so a large document does not sit in
 * the function's memory on the way through.
 */
export async function streamAttachment(
  url: string,
  fileName: string,
): Promise<Response> {
  let upstream: Response;

  try {
    upstream = await fetch(url, { cache: "no-store" });
  } catch (error) {
    logger.error("Attachment fetch failed", error);
    return new Response("Not found", { status: 404 });
  }

  if (!upstream.ok || !upstream.body) {
    logger.warn("Attachment missing from storage", { status: upstream.status });
    return new Response("Not found", { status: 404 });
  }

  const safeName = toSafeFileName(fileName) || "download";
  const contentLength = upstream.headers.get("content-length");

  return new Response(upstream.body, {
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/octet-stream",
      // Both forms: the quoted one for old clients, `filename*` so a name with
      // non-ASCII in it survives. `toSafeFileName` has already removed the
      // quotes and control characters that would break out of the header.
      "Content-Disposition": `attachment; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(safeName)}`,
      ...(contentLength && { "Content-Length": contentLength }),
      // The response is personal data behind an authorization check. A shared
      // cache holding it would serve it to whoever asked next.
      "Cache-Control": "private, no-store, max-age=0",
      // The file is downloaded, never rendered in place — this stops a stored
      // document being interpreted as anything on our origin.
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}
