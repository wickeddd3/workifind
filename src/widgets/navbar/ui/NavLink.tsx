"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActiveLink } from "@/shared/lib/is-active-link";
import { cn } from "@/shared/lib/utils";

export function NavLink({
  title = "",
  link = "/",
}: {
  title: string;
  link: string;
}) {
  const pathname = usePathname();
  const isActive = isActiveLink(pathname, link);

  return (
    <Link
      href={link}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-sm font-medium tracking-wide transition-colors",
        isActive ? "text-primary" : "text-foreground hover:text-primary",
      )}
    >
      {title}
    </Link>
  );
}
