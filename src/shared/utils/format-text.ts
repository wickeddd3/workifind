export const toSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

/**
 * Reduce a user-supplied filename to something safe to store and to put in a
 * `Content-Disposition` header.
 *
 * Directory components go, because the name arrives from a browser and a
 * `../` in it is only ever an attempt at something. Quotes, backslashes and
 * control characters go because the header value is quoted, and a name
 * carrying a `"` or a newline out of it is header injection.
 */
export const toSafeFileName = (name: string, maxLength = 120) => {
  const base = name.split(/[\\/]/).pop() ?? name;

  return (
    base
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001f\u007f"\\]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maxLength)
      .trim()
  );
};
