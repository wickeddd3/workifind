"use client";

import { UserProfile } from "@clerk/nextjs";

import { useClerkAppearance } from "@/shared/lib/clerk-appearance";

/**
 * Clerk's account management, rendered inline rather than in the modal its
 * `<UserButton />` opens.
 *
 * Path routing, so each tab is a real URL — `/account/security` can be linked
 * to and survives a reload, which the modal's state could not. That is what
 * the `[[...rest]]` segment above this page exists for.
 */
export function ManageAccount() {
  const appearance = useClerkAppearance();

  return <UserProfile path="/account" routing="path" appearance={appearance} />;
}
