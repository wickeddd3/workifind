"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@/contexts/UserContext";
import { useMemo } from "react";

export default function Navbar() {
  const { user } = useUser();

  const profileRoute = useMemo(() => {
    if (user?.role === "APPLICANT") {
      return "/applicant/profile";
    }
    if (user?.role === "EMPLOYER") {
      return "/employer/profile";
    }
    return "/";
  }, [user]);

  const isEmployer = useMemo(() => user?.role === "EMPLOYER", [user]);

  return (
    <header>
      <nav className="m-auto flex max-w-7xl items-center justify-between px-3 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-mono text-2xl font-semibold tracking-wider">
            workifind
          </span>
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
          {user && (
            <Link href={profileRoute} className="flex items-center gap-3">
              <span className="text-sm font-medium tracking-wide">Profile</span>
            </Link>
          )}
        </div>
        <div className="flex gap-2">
          {isEmployer && (
            <Button asChild className="bg-[#3366FF] hover:bg-[#254EDB]">
              <Link href="/employer/jobs/new">Post a job</Link>
            </Button>
          )}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
