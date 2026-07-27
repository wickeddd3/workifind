import Link from "next/link";

import IconBrand from "@/shared/ui/icons/IconBrand";

import { menuLinks } from "../model/navbar-links";
import { MobileMenu } from "./MobileMenu";
import { NavbarAuthActions } from "./NavbarAuthActions";
import { NavLink } from "./NavLink";
import { ProfileNavLink } from "./ProfileNavLink";

/**
 * Renders in the root layout, so nothing here may read auth on the server —
 * that would opt every route in the app out of static rendering. The
 * auth-dependent pieces are client components that resolve their own state.
 */
export function Navbar() {
  return (
    <header className="flex w-full items-center justify-center py-2">
      <nav className="flex w-full max-w-7xl items-center justify-between rounded-full border border-gray-100 bg-white px-4 py-2 shadow-soft lg:py-3">
        {/* Mobile Menu Links */}
        <MobileMenu />
        <Link
          href="/"
          aria-label="workifind home"
          className="flex w-fit items-center gap-2"
        >
          <IconBrand className="h-8 w-8 shrink-0" />
          <span className="text-xl font-extrabold tracking-wider text-gray-800">
            workifind
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {menuLinks.map((item) => (
            <NavLink key={item.title} title={item.title} link={item.link} />
          ))}
          {/* Profile Link — renders itself only once a role is known. */}
          <ProfileNavLink />
        </div>
        <NavbarAuthActions />
      </nav>
    </header>
  );
}
