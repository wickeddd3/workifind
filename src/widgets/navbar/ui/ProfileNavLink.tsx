"use client";

import { profileRoute } from "../model/get-profile-route";
import { useUserRole } from "../model/use-user-role";
import { NavLink } from "./NavLink";

/**
 * Profile link, hidden until Clerk reports a role. Client-side so the navbar —
 * and therefore the root layout — never reads request headers.
 */
export function ProfileNavLink() {
  const { role } = useUserRole();

  if (!role) return null;

  return <NavLink title="Profile" link={profileRoute(role)} />;
}
