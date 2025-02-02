"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import PostJobButton from "@/components/jobs/PostJobButton";
import { BriefcaseBusiness, Building2, Menu, User, Users } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ReactNode, useMemo } from "react";

interface ItemLinkProps {
  title: string;
  link: string;
  icon: ReactNode | null;
}

export const MenubarItemLink = ({
  title = "",
  link = "/",
  icon = null,
}: ItemLinkProps) => {
  return (
    <MenubarItem asChild>
      <Link
        href={link}
        className="flex w-full cursor-pointer items-center gap-3"
      >
        <span className="w-full text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
          {title}
        </span>
        {icon && <MenubarShortcut>{icon}</MenubarShortcut>}
      </Link>
    </MenubarItem>
  );
};

export const NavbarLink = ({ title = "", link = "/" }: ItemLinkProps) => {
  return (
    <Link href={link} className="flex items-center gap-3">
      <span className="text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
        {title}
      </span>
    </Link>
  );
};

export function ApplicantProfileMenu() {
  return (
    <>
      <MenubarItem asChild>
        <Link
          href="/applicant/jobs"
          className="flex w-full cursor-pointer items-center gap-3"
        >
          <span className="w-full text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
            Applied Jobs
          </span>
        </Link>
      </MenubarItem>
      <MenubarItem asChild>
        <Link
          href="/applicant/jobs/saved"
          className="flex w-full cursor-pointer items-center gap-3"
        >
          <span className="w-full text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
            Saved Jobs
          </span>
        </Link>
      </MenubarItem>
    </>
  );
}

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const role = useMemo(() => user?.unsafeMetadata.role || "", [user]);
  const profileRoute = useMemo(() => {
    // if (!currentUser && !currentUserRole) {
    //   return "/setup";
    // }
    if (user && role === "APPLICANT") {
      return "/applicant/profile";
    }
    if (user && role === "EMPLOYER") {
      return "/employer/profile";
    }
    return "/setup";
  }, [user, role]);
  const isEmployer = useMemo(
    () => isSignedIn && role === "EMPLOYER",
    [isSignedIn, role],
  );
  const isApplicant = useMemo(
    () => isSignedIn && role === "APPLICANT",
    [isSignedIn, role],
  );
  const menuItems = useMemo(
    () => [
      {
        title: "Find jobs",
        link: "/jobs",
        icon: <BriefcaseBusiness size={16} />,
        isVisible: true,
      },
      {
        title: "Companies",
        link: "/companies",
        icon: <Building2 size={16} />,
        isVisible: true,
      },
      {
        title: "Professionals",
        link: "/professionals",
        icon: <Users size={16} />,
        isVisible: true,
      },
      {
        title: "Profile",
        link: profileRoute,
        icon: <User size={16} />,
        isVisible: isSignedIn,
      },
      // employers only
      {
        title: "My Jobs",
        link: "/employer/jobs",
        icon: null,
        isVisible: isEmployer,
      },
      // applicants only
      {
        title: "Applied Jobs",
        link: "/applicant/jobs",
        icon: null,
        isVisible: isApplicant,
      },
      {
        title: "Saved Jobs",
        link: "/applicant/jobs/saved",
        icon: null,
        isVisible: isApplicant,
      },
    ],
    [isSignedIn, isEmployer, isApplicant, profileRoute],
  );

  return (
    <header className="flex h-full w-full items-center justify-center py-2">
      <nav className="flex h-full w-full max-w-7xl items-center justify-between rounded-full bg-gray-50 px-3 py-2 shadow-sm lg:py-4">
        <Menubar className="block border-none bg-transparent md:hidden">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer rounded-full bg-indigo-600 p-2 shadow-sm hover:bg-indigo-700 data-[state=closed]:bg-indigo-600 data-[state=open]:bg-indigo-700">
              <Menu size={18} color="#ffffff" />
            </MenubarTrigger>
            <MenubarContent>
              {menuItems.map(
                (item) =>
                  item.isVisible && (
                    <MenubarItemLink key={item.title} {...item} />
                  ),
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Link href="/" className="flex w-fit items-center gap-2">
          <div className="flex w-fit items-center gap-2">
            <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-neutral-100 shadow-md md:flex">
              <h3 className="text-center align-middle text-lg font-extrabold">
                W
              </h3>
            </div>
            <h3 className="text-xl font-extrabold tracking-wider text-gray-800">
              workifind
            </h3>
          </div>
        </Link>
        <div className="hidden gap-6 md:flex">
          {menuItems.map(
            (item) =>
              item.isVisible && <NavbarLink key={item.title} {...item} />,
          )}
        </div>
        <div className="flex gap-2 md:gap-4">
          <SignedOut>
            <SignInButton>
              <Button className="rounded-full bg-gray-50 font-extrabold text-gray-800 hover:bg-gray-50 hover:text-indigo-600">
                Log In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="rounded-full bg-indigo-600 font-extrabold text-gray-50 hover:bg-indigo-700">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <PostJobButton />
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
