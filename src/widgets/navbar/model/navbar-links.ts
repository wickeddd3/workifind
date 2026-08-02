import {
  BriefcaseBusiness,
  Building2,
  type LucideIcon,
  Users,
} from "lucide-react";

import type { Role } from "./get-profile-route";

type MenuLink = {
  title: string;
  link: string;
  icon: LucideIcon;
  /** Roles allowed to see the link. Omitted means everyone, signed out included. */
  roles?: Role[];
};

export const menuLinks: MenuLink[] = [
  {
    title: "Find jobs",
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
    // The candidate directory is a hiring tool, so applicants — and anyone not
    // signed in — never see it. The pages behind it gate on the server too.
    roles: ["EMPLOYER"],
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

export const mobileMenuLinks = [];
