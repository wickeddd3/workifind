import {
  BriefcaseBusiness,
  Building2,
  type LucideIcon,
  Settings,
  User,
  UserCog,
  Users,
} from "lucide-react";

import { profileRoute, type Role } from "./get-profile-route";

export type MenuLink = {
  title: string;
  link: string;
  icon: LucideIcon;
  /** Roles allowed to see the link. Omitted means everyone, signed out included. */
  roles?: Role[];
  /**
   * Highlight only on an exact path match. Needed where one link's path is a
   * prefix of another's — `/applicant/jobs` and `/applicant/jobs/saved` sit
   * side by side in the account menu, and prefix matching lit both at once.
   */
  exact?: boolean;
};

/**
 * Three parallel nouns. "Find jobs" was the odd one out, and left-aligning the
 * bar put the three side by side where the mismatched verb showed.
 */
export const menuLinks: MenuLink[] = [
  {
    title: "Jobs",
    link: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Companies",
    link: "/companies",
    icon: Building2,
  },
  {
    title: "Professionals",
    link: "/professionals",
    icon: Users,
    // Open to everyone, signed out included. What differs by role is how much
    // of a profile is returned, not whether the directory exists — see
    // `profileVisibility` in the applicant entity.
  },
];

/**
 * The links a visitor holding `role` may see. `undefined` covers both signed
 * out visitors and users who have not finished profile setup.
 */
export function visibleMenuLinks(role: Role | undefined): MenuLink[] {
  return menuLinks.filter(
    (item) => !item.roles || (role !== undefined && item.roles.includes(role)),
  );
}

/**
 * The personal links behind the avatar — the things that belong to *you*
 * rather than to the site. Kept out of `menuLinks` deliberately: the header's
 * own nav is the same for everyone with a given role, while these follow the
 * signed-in user and change with them.
 *
 * A function rather than a table because the profile route itself depends on
 * the role.
 */
export function accountMenuLinks(role: Role | undefined): MenuLink[] {
  return [
    { title: "Profile", link: profileRoute(role), icon: User },
    // One entry, not two: the saved list is a tab on the applications page
    // now, so a second link here would point at half of a page the first one
    // already reaches.
    ...(role === "APPLICANT"
      ? [{ title: "My jobs", link: "/applicant/jobs", icon: BriefcaseBusiness }]
      : []),
    ...(role === "EMPLOYER"
      ? [{ title: "My jobs", link: "/employer/jobs", icon: BriefcaseBusiness }]
      : []),
  ];
}

/**
 * Account administration, which is the same for every signed-in user — the
 * Clerk-backed identity page and the app's own preferences. Separated from
 * `accountMenuLinks` so the dropdown can rule between "what I do here" and
 * "how this account works".
 */
export const accountSettingsLinks: MenuLink[] = [
  { title: "Manage account", link: "/account", icon: UserCog },
  { title: "Settings", link: "/settings", icon: Settings },
];
