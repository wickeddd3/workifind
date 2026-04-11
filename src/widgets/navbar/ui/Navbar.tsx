import Link from "next/link";
import { Button } from "@/shared/ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { PostJobButton } from "./PostJobButton";
import { NavLink } from "./NavLink";
import { menuLinks } from "../model/navbar-links";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ProfileNavLink } from "./ProfileNavLink";
import { profileRoute } from "../model/get-profile-route";
import { MobileMenu } from "./MobileMenu";

export async function Navbar() {
  const { role } = await getAuthUser();
  const isEmployer = role === "EMPLOYER";

  return (
    <header className="flex w-full items-center justify-center py-2">
      <nav className="flex w-full max-w-7xl items-center justify-between rounded-full bg-gray-50 px-3 py-2 shadow-sm lg:py-4">
        {/* Mobile Menu Links */}
        <MobileMenu role={role} />
        <Link href="/" className="flex w-fit items-center gap-2">
          <div className="flex w-fit items-center gap-2">
            <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-neutral-100 shadow-md md:flex">
              <h3 className="text-center align-middle text-lg font-extrabold">
                W
              </h3>
            </div>
            <h3 className="text-xl font-extrabold tracking-wider text-gray-800">
              workifind
            </h3>
          </div>
        </Link>
        <div className="hidden gap-6 md:flex">
          {menuLinks.map((item) => (
            <NavLink key={item.title} {...item} />
          ))}
          {/* Profile Link */}
          {role && <ProfileNavLink title="Profile" link={profileRoute(role)} />}
        </div>
        <div className="flex gap-2 md:gap-4">
          <SignedOut>
            <SignInButton>
              <Button className="rounded-full bg-gray-50 font-extrabold text-gray-800 hover:bg-gray-50 hover:text-indigo-600">
                Log In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="rounded-full bg-indigo-600 font-extrabold text-gray-50 hover:bg-indigo-700">
                Sign Up
              </Button>
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
