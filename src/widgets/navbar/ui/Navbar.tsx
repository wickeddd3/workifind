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
        {/* Mobile Menu Links */}
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
        {/* Sits directly against the brand rather than centred in the bar. The
            links read as this site's sections, which is what a masthead group
            says and what a floating middle cluster does not — and the group no
            longer shifts sideways as role changes how many links there are.
            The auth actions carry their own `ml-auto` to reach the far edge —
            it cannot live on this group, which is `hidden` on a phone, and a
            `display: none` box pushes nothing. */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {/* Menu links — role-aware, so they resolve their own auth state. */}
          <NavMenuLinks />
        </div>
        <NavbarAuthActions />
      </nav>
    </header>
  );
}
