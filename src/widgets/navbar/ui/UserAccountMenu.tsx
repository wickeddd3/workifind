"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActiveLink } from "@/shared/lib/is-active-link";
import { cn } from "@/shared/lib/utils";
import { Avatar } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import {
  accountMenuLinks,
  accountSettingsLinks,
  type MenuLink,
  visibleMenuLinks,
} from "../model/navbar-links";
import { useUserRole } from "../model/use-user-role";

function AccountMenuLink({ title, link, icon: Icon, exact }: MenuLink) {
  const pathname = usePathname();
  const isActive = isActiveLink(pathname, link, exact);

  return (
    <DropdownMenuItem asChild>
      <Link
        href={link}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 px-2 py-2 text-sm font-medium",
          // Tinted row rather than tinted text, matching the desktop pill and
          // the mobile menu. Colour alone was the whole signal, and these rows
          // now carry the site's own navigation on a phone rather than just
          // the account's, so which one you are on matters more than it did.
          isActive
            ? "bg-primary/10 text-primary focus:bg-primary/15 focus:text-primary"
            : "text-foreground",
        )}
      >
        <Icon size={16} className="shrink-0" aria-hidden="true" />
        {title}
      </Link>
    </DropdownMenuItem>
  );
}

/**
 * The avatar and everything behind it.
 *
 * Replaces Clerk's `<UserButton />` so the menu can carry the app's own
 * destinations — profile, the signed-in user's job lists, settings — beside
 * Clerk's account management, and so it renders with the same tokens as the
 * rest of the UI in both themes. Account management itself still belongs to
 * Clerk; this only links to the page that hosts it.
 *
 * Renders inside `<SignedIn>`, so `user` is present by the time this mounts.
 * The fallbacks below cover the frame before Clerk resolves rather than a
 * signed-out visitor.
 */
export function UserAccountMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { role } = useUserRole();

  const name = user?.fullName ?? user?.username ?? "Your account";
  const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="rounded-full ring-offset-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {/* `hasImage` rather than `imageUrl`: Clerk always returns a URL, so
            testing the URL would never fall through to our own initials. */}
        <Avatar
          name={name}
          src={user?.hasImage ? user.imageUrl : null}
          size={36}
          className="rounded-full"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 p-1.5">
        <div className="flex flex-col gap-0.5 px-2 py-2">
          <span className="truncate text-sm font-semibold text-foreground">
            {name}
          </span>
          {email && (
            <span className="truncate text-xs text-muted-foreground">
              {email}
            </span>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* The site's own sections, on small screens only. A signed-in phone
            had two menus a thumb's width apart — a hamburger holding the site
            and an avatar holding the account — with nothing to tell you which
            was which. Folding the site into the avatar leaves one.

            `md:hidden` because the bar itself lists these above that
            breakpoint, and a menu that repeats what is already on screen beside
            it is just a second place to keep in sync. */}
        <DropdownMenuGroup className="md:hidden">
          {visibleMenuLinks(role).map((item) => (
            <AccountMenuLink key={item.title} {...item} />
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="md:hidden" />

        <DropdownMenuGroup>
          {accountMenuLinks(role).map((item) => (
            <AccountMenuLink key={item.title} {...item} />
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {accountSettingsLinks.map((item) => (
            <AccountMenuLink key={item.title} {...item} />
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => void signOut({ redirectUrl: "/" })}
          className="flex cursor-pointer items-center gap-3 px-2 py-2 text-sm font-medium text-foreground"
        >
          <LogOut size={16} className="shrink-0" aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
