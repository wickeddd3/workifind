"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActiveLink } from "@/shared/lib/is-active-link";
import { cn } from "@/shared/lib/utils";

/**
 * One link in the desktop bar.
 *
 * The current page is marked by a filled pill, not by colour alone. Two
 * reasons. Colour on its own is the one distinction WCAG 1.4.1 names
 * explicitly, and it was carrying the whole signal here. And hover used the
 * same `text-primary` as active, so pointing at "Companies" made it
 * indistinguishable from the page you were actually on — the one state a nav
 * exists to communicate.
 *
 * Padding sits on every link rather than on the active one, so the row does not
 * reflow as you navigate. Weight stays `medium` in both states for the same
 * reason: `semibold` is wider, and nudging the neighbours is a worse cost than
 * the emphasis is worth once the pill is doing the work.
 */
export function NavLink({
  title = "",
  link = "/",
}: {
  title: string;
  link: string;
}) {
  const pathname = usePathname();
  const isActive = isActiveLink(pathname, link);

  return (
    <Link
      href={link}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm font-medium tracking-wide transition-colors",
        // Offset against the bar's own surface, not the page: the nav sits on
        // `bg-card`, and a ring offset in `background` would draw a pale halo.
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        // Inactive links keep `text-foreground`. Receding them to
        // `text-muted-foreground` made the active one read as more prominent,
        // but measured 4.29:1 against the bar in the light theme — under the
        // 4.5:1 AA floor for 14px text. The pill already carries the emphasis,
        // so the contrast is not a cost worth paying for it.
        isActive
          ? // `dark:text-brand-300` rather than plain `text-primary`: the pill
            // tint lightens the backdrop under its own label, so in the dark
            // theme the active link measured 3.35:1 against it — worse than the
            // 3.71:1 it had with no pill at all. The lighter brand step is the
            // same hue at a contrast the text can be read at.
            "bg-primary/10 text-primary dark:text-brand-300"
          : "text-foreground hover:bg-muted hover:text-primary",
      )}
    >
      {title}
    </Link>
  );
}
