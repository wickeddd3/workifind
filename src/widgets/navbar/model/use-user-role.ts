"use client";

import { useUser } from "@clerk/nextjs";

import type { Role } from "./get-profile-route";

/**
 * The signed-in user's role, read on the client.
 *
 * The navbar renders in the root layout, so resolving the role on the server
 * would read request headers and opt every route in the app out of static
 * rendering. Reading it here keeps the layout static and lets public pages be
 * prerendered.
 *
 * `role` is undefined until Clerk hydrates, which matches how the surrounding
 * `<SignedIn>` / `<SignedOut>` boundaries already behave.
 *
 * Safe to read client-side: `publicMetadata` is public by definition, and it is
 * never the basis for authorization — server-side gates call `requireRole`.
 */
export function useUserRole(): { role: Role | undefined; isLoaded: boolean } {
  const { user, isLoaded } = useUser();

  return {
    role: user?.publicMetadata?.role as Role | undefined,
    isLoaded,
  };
}
