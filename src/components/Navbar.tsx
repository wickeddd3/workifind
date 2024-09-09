"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { useUser } from "@/contexts/UserContext";
import { useMemo } from "react";
import PostJobButton from "@/components/jobs/PostJobButton";
import { BriefcaseBusiness, Building2, Menu, User, Users } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function Navbar() {
  const { user } = useUser();

  const profileRoute = useMemo(() => {
    if (!user) {
      return "/setup";
    }
    if (user?.role === "APPLICANT") {
      return "/applicant/profile";
    }
    if (user?.role === "EMPLOYER") {
      return "/employer/profile";
    }
    return "/";
  }, [user]);

  return (
    <header className="flex h-full w-full items-center justify-center py-2">
      <nav className="flex h-full w-full max-w-7xl items-center justify-between rounded-full bg-gray-50 px-3 py-2 shadow-sm lg:py-4">
        <Menubar className="block border-none bg-transparent md:hidden">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer rounded-full bg-indigo-600 p-2 shadow-sm hover:bg-indigo-700 data-[state=closed]:bg-indigo-600 data-[state=open]:bg-indigo-700">
              <Menu size={18} color="#ffffff" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link
                  href="/jobs"
                  className="flex w-full cursor-pointer items-center gap-3"
                >
                  <span className="w-full text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
                    Find jobs
                  </span>
                  <MenubarShortcut>
                    <BriefcaseBusiness size={16} />
                  </MenubarShortcut>
                </Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link
                  href="/companies"
                  className="flex w-full cursor-pointer items-center gap-3"
                >
                  <span className="w-full text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
                    Companies
                  </span>
                  <MenubarShortcut>
                    <Building2 size={16} />
                  </MenubarShortcut>
                </Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link
                  href="/professionals"
                  className="flex w-full cursor-pointer items-center gap-3"
                >
                  <span className="w-full text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
                    Professionals
                  </span>
                  <MenubarShortcut>
                    <Users size={16} />
                  </MenubarShortcut>
                </Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem asChild>
                <Link
                  href={profileRoute}
                  className="flex w-full cursor-pointer items-center gap-3"
                >
                  <span className="w-full text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
                    Profile
                  </span>
                  <MenubarShortcut>
                    <User size={16} />
                  </MenubarShortcut>
                </Link>
              </MenubarItem>
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
          <Link href="/jobs" className="flex items-center gap-3">
            <span className="text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
              Find jobs
            </span>
          </Link>
          <Link href="/companies" className="flex items-center gap-3">
            <span className="text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
              Companies
            </span>
          </Link>
          <Link href="/professionals" className="flex items-center gap-3">
            <span className="text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
              Professionals
            </span>
          </Link>
          <Link href={profileRoute} className="flex items-center gap-3">
            <span className="text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
              Profile
            </span>
          </Link>
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
