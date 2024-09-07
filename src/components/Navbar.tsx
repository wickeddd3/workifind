"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useUser } from "@/contexts/UserContext";
import { useMemo } from "react";
import PostJobButton from "@/components/jobs/PostJobButton";

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
        <Link href="/" className="flex w-fit items-center gap-2">
          <div className="flex w-fit items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-neutral-100 shadow-md">
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
            <span className="text-sm font-medium tracking-wide">Find jobs</span>
          </Link>
          <Link href="/companies" className="flex items-center gap-3">
            <span className="text-sm font-medium tracking-wide">Companies</span>
          </Link>
          <Link href="/professionals" className="flex items-center gap-3">
            <span className="text-sm font-medium tracking-wide">
              Professionals
            </span>
          </Link>
          <Link href={profileRoute} className="flex items-center gap-3">
            <span className="text-sm font-medium tracking-wide">Profile</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <PostJobButton />
          <SignedOut>
            <SignInButton>
              <Button className="bg-[#3366FF] hover:bg-[#254EDB]">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
