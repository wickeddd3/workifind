"use client";

import { SignedIn } from "@clerk/nextjs";
import { ChevronRight, UserCog } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/shared/ui/typography/Typography";

/**
 * A pointer to the Clerk-backed account page.
 *
 * Settings is where people look for "change my password", but that lives with
 * the identity provider rather than here, so the page has to hand them on
 * instead of dead-ending. Signed out it renders nothing — there is no account
 * to manage, and the rest of this page still works without one.
 */
export function AccountSetting() {
  return (
    <SignedIn>
      <section
        id="account"
        className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6"
      >
        <SectionHeading>Account</SectionHeading>

        <Link
          href="/account"
          className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-primary/40"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <UserCog size={16} aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              Manage account
            </span>
            <span className="text-xs text-muted-foreground">
              Email, password, connected accounts and active devices
            </span>
          </span>
          <ChevronRight
            size={16}
            aria-hidden="true"
            className="ml-auto shrink-0 text-muted-foreground"
          />
        </Link>
      </section>
    </SignedIn>
  );
}
