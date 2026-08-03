"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

import { Button } from "@/shared/ui/button";

import { UserAccountMenu } from "./UserAccountMenu";

/**
 * Sign-in / sign-out affordances for the navbar.
 *
 * Deliberately a client component. `@clerk/nextjs` resolves `SignedIn` and
 * `SignedOut` to different implementations by environment: in a server
 * component they call `await auth()`, which reads request headers and opts the
 * whole app out of static rendering, since the navbar lives in the root layout.
 * From a client component the bundler picks the client build, which reads the
 * same state from context after hydration.
 */
export function NavbarAuthActions() {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <SignedOut>
        <SignInButton>
          <Button
            variant="ghost"
            className="rounded-full font-semibold text-foreground hover:text-primary"
          >
            Log in
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button className="rounded-full font-semibold">Sign up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        {/* Everything personal — profile, job lists, account, sign out —
            hangs off the avatar rather than competing for room in the bar. */}
        <UserAccountMenu />
      </SignedIn>
    </div>
  );
}
