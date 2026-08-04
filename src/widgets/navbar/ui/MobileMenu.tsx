"use client";

import { SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/shared/ui/menubar";

import { visibleMenuLinks } from "../model/navbar-links";
import { useUserRole } from "../model/use-user-role";
import { MobileMenuNavLink } from "./MobileMenuNavLink";

/**
 * The site's navigation on small screens, for visitors who are signed out.
 *
 * A signed-in phone gets these from the avatar menu instead — one menu rather
 * than a hamburger and an avatar sitting a thumb's width apart with no rule for
 * which held what. Signed out there is no avatar to put them behind, and
 * without this the whole site would be unreachable from a phone: no jobs, no
 * companies, and no professionals directory, which is now open to guests.
 *
 * `SignedOut` has to be evaluated here rather than in `Navbar`. In a server
 * component Clerk resolves it by calling `auth()`, which reads request headers
 * — and the navbar renders in the root layout, so that would opt every route in
 * the app out of static rendering.
 */
export function MobileMenu() {
  const { role } = useUserRole();

  return (
    <SignedOut>
      <Menubar className="block border-none bg-transparent md:hidden">
        <MenubarMenu>
          <MenubarTrigger
            aria-label="Open navigation menu"
            className="cursor-pointer rounded-full bg-primary p-2 shadow-sm hover:bg-primary/90 data-[state=closed]:bg-primary data-[state=open]:bg-primary/90"
          >
            <Menu size={18} className="text-white" aria-hidden="true" />
          </MenubarTrigger>
          <MenubarContent>
            {visibleMenuLinks(role).map((item) => (
              <MobileMenuNavLink key={item.title} {...item} />
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </SignedOut>
  );
}
