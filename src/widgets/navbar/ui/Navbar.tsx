import Link from "next/link";

import IconBrand from "@/shared/ui/icons/IconBrand";

import { MobileMenu } from "./MobileMenu";
import { NavbarAuthActions } from "./NavbarAuthActions";
import { NavMenuLinks } from "./NavMenuLinks";

/**
 * Renders in the root layout, so nothing here may read auth on the server —
 * that would opt every route in the app out of static rendering. The
 * auth-dependent pieces are client components that resolve their own state.
 *
 * The bar carries the site's own navigation and nothing else. Anything that
 * belongs to the signed-in user — profile, their job lists, account, theme —
 * lives behind the avatar or on the settings page, so the bar stops growing a
 * new item every time the product does.
 */
export function Navbar() {
  return (
    <header className="flex w-full items-center justify-center py-2">
      <nav className="flex w-full max-w-7xl items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-soft lg:py-3">
        {/* The site's links on a phone, and only while signed out — a
            signed-in visitor gets them from the avatar menu instead, so this
            renders nothing and the brand leads the bar. */}
        <MobileMenu />
        <Link
          href="/"
          aria-label="workifind home"
          className="flex w-fit shrink-0 items-center gap-2"
        >
          <IconBrand className="h-8 w-8 shrink-0" />
          <span className="text-xl font-extrabold tracking-wider text-foreground">
            workifind
          </span>
        </Link>
        {/* Left-aligned against the brand rather than centred in the bar. The
            links read as this site's sections, which is what a masthead group
            says and what a floating middle cluster does not — and the group no
            longer shifts sideways as role changes how many links there are.
            The auth actions carry their own `ml-auto` to reach the far edge —
            it cannot live on this group, which is `hidden` on a phone, and a
            `display: none` box pushes nothing.

            The leading margin is set against the gap *inside* the group, not
            picked to look right on its own: at the bar's `gap-2` alone the
            wordmark sat 0.5rem from the first link while the links sat 1.5rem
            apart, so the closest thing to "Jobs" was the brand and the three
            read as a four-item list. The larger space now falls between the
            groups, which is what makes them two.

            Measured text to text, since `NavLink` carries `px-3` for its active
            pill and that padding is part of what separates them: 1.75rem
            within the group against 3.25rem to the brand, scaling to 2rem and
            3.75rem at `lg`. That is why the flex gap here is `gap-1` and not
            the `gap-6` it would be without the pills — the same visual result
            reached with less of it coming from the gap property. */}
        <div className="ml-8 hidden items-center gap-1 md:flex lg:ml-10 lg:gap-2">
          {/* Menu links — role-aware, so they resolve their own auth state. */}
          <NavMenuLinks />
        </div>
        <NavbarAuthActions />
      </nav>
    </header>
  );
}
