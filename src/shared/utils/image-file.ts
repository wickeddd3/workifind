/**
 * What counts as a profile image, in one place.
 *
 * An avatar and a company logo are the same file under the same rules, and the
 * two entities that own them cannot import each other — so the rules live down
 * here and each entity applies them under its own name.
 *
 * No domain knowledge: this knows about bytes and MIME types, not about who is
 * in the picture.
 */

/**
 * Raster formats every browser encodes and every browser renders. No SVG: it is
 * a document format that executes script, and these are served from a blob host
 * on a URL anyone may open. No GIF either — an animated avatar in a list of
 * search results is a distraction nobody asked for.
 */
export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

/** For the file input's `accept`. Extensions and types, since browsers disagree. */
export const IMAGE_ACCEPT = [...IMAGE_EXTENSIONS, ...IMAGE_MIME_TYPES].join(
  ",",
);

/**
 * 2MB. Well under the 4.5MB a serverless function on Vercel rejects before any
 * of our code runs, so the cap is enforced by a message we control rather than
 * by the platform returning 413 to a progress bar at 99%.
 */
export const IMAGE_MAX_SIZE_BYTES = 2 * 1024 * 1024;
export const IMAGE_MAX_SIZE_LABEL = "2MB";

/**
 * Why an image is not acceptable, or `null` if it is.
 *
 * Returns the message rather than a boolean so the browser and the upload route
 * refuse a file for the same stated reason. The browser check is a courtesy —
 * it saves sending the bytes to be told no — and the route repeats it, because
 * anything can post to a route.
 *
 * `label` names the thing in the message: "Logo must be a JPG, PNG or WebP"
 * beats a generic "file", which leaves the reader guessing which field on the
 * form went wrong.
 */
export function getImageFileError(file: File, label: string): string | null {
  if (!(IMAGE_MIME_TYPES as readonly string[]).includes(file.type)) {
    return `${label} must be a JPG, PNG or WebP image`;
  }
  if (file.size === 0) return "That file is empty";
  if (file.size > IMAGE_MAX_SIZE_BYTES) {
    return `${label} must be smaller than ${IMAGE_MAX_SIZE_LABEL}`;
  }

  return null;
}
