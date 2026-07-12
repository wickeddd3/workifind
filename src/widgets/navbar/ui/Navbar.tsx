import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

import { getAuthUser } from "@/shared/lib/clerk.server";
import { Button } from "@/shared/ui/button";
import IconBrand from "@/shared/ui/icons/IconBrand";

import { profileRoute } from "../model/get-profile-route";
import { menuLinks } from "../model/navbar-links";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { PostJobButton } from "./PostJobButton";
import { ProfileNavLink } from "./ProfileNavLink";

export async function Navbar() {
  const { role } = await getAuthUser();
  const isEmployer = role === "EMPLOYER";

  return (
    <header className="flex w-full items-center justify-center py-2">
      <nav className="flex w-full max-w-7xl items-center justify-between rounded-full border border-gray-100 bg-white px-4 py-2 shadow-soft lg:py-3">
        {/* Mobile Menu Links */}
        <MobileMenu role={role} />
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
          {/* Profile Link */}
          {role && <ProfileNavLink title="Profile" link={profileRoute(role)} />}
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <SignedOut>
            <SignInButton>
              <Button
                variant="ghost"
                className="rounded-full font-semibold text-gray-700 hover:text-indigo-600"
              >
                Log in
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="rounded-full font-semibold">Sign up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            {/* Employer Post Job Link */}
            {isEmployer && <PostJobButton />}
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
