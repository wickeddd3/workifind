/**
 * Whether `link` is the page currently being viewed.
 *
 * Prefix matching by default, so a link to `/jobs` stays lit on `/jobs/senior-
 * engineer`; `exact` opts out where one link's path is a prefix of another's
 * and both would otherwise highlight together.
 */
export function isActiveLink(pathname: string, link: string, exact = false) {
  if (exact || link === "/") return pathname === link;

  return pathname === link || pathname.startsWith(`${link}/`);
}
