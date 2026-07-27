"use client";

import { Bookmark, BriefcaseBusiness, Menu, User } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/shared/ui/menubar";

import { profileRoute } from "../model/get-profile-route";
import { menuLinks } from "../model/navbar-links";
import { useUserRole } from "../model/use-user-role";
import { MobileMenuNavLink } from "./MobileMenuNavLink";

// Reads its own role rather than taking it as a prop, so the server component
// that renders it never has to touch auth.
export function MobileMenu() {
  const { role } = useUserRole();
  const isApplicant = role === "APPLICANT";
  const isEmployer = role === "EMPLOYER";

  return (
    <Menubar className="block border-none bg-transparent md:hidden">
      <MenubarMenu>
        <MenubarTrigger
          aria-label="Open navigation menu"
          className="cursor-pointer rounded-full bg-indigo-600 p-2 shadow-sm hover:bg-indigo-700 data-[state=closed]:bg-indigo-600 data-[state=open]:bg-indigo-700"
        >
          <Menu size={18} className="text-white" aria-hidden="true" />
        </MenubarTrigger>
        <MenubarContent>
          {menuLinks.map((item) => (
            <MobileMenuNavLink key={item.title} {...item} />
          ))}
          {/* Profile Link  */}
          {role && (
            <MobileMenuNavLink
              title="Profile"
              link={profileRoute(role)}
              icon={User}
            />
          )}
          {/* Applicant only Links */}
          {isApplicant && (
            <>
              <MobileMenuNavLink
                title="Applied jobs"
                link="/applicant/jobs"
                icon={BriefcaseBusiness}
              />
              <MobileMenuNavLink
                title="Saved jobs"
                link="/applicant/jobs/saved"
                icon={Bookmark}
              />
            </>
          )}
          {/* Employer only Links */}
          {isEmployer && (
            <MobileMenuNavLink
              title="My jobs"
              link="/employer/jobs"
              icon={BriefcaseBusiness}
            />
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
