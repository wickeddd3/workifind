"use client";

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
 * The site's navigation on small screens — the same links the desktop bar
 * shows, and only those.
 *
 * It used to carry the user's own links and the theme switch as well, which
 * made a phone's hamburger and its avatar two menus with overlapping contents
 * and no rule for which held what. The avatar owns everything personal at
 * every width now; this owns the site.
 */
export function MobileMenu() {
  const { role } = useUserRole();

  return (
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
  );
}
