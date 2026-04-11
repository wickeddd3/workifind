import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/shared/ui/menubar";
import { Menu, User } from "lucide-react";
import { MobileMenuNavLink } from "./MobileMenuNavLink";
import { profileRoute, Role } from "../model/get-profile-route";
import { menuLinks } from "../model/navbar-links";

export function MobileMenu({ role }: { role: Role | undefined }) {
  const isApplicant = role === "APPLICANT";
  const isEmployer = role === "EMPLOYER";

  return (
    <Menubar className="block border-none bg-transparent md:hidden">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer rounded-full bg-indigo-600 p-2 shadow-sm hover:bg-indigo-700 data-[state=closed]:bg-indigo-600 data-[state=open]:bg-indigo-700">
          <Menu size={18} color="#ffffff" />
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
              <MobileMenuNavLink title="Applied Jobs" link="/applicant/jobs" />
              <MobileMenuNavLink
                title="Saved Jobs"
                link="/applicant/jobs/saved"
              />
            </>
          )}
          {/* Employer only Links */}
          {isEmployer && (
            <MobileMenuNavLink title="My Jobs" link="/employer/jobs" />
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
