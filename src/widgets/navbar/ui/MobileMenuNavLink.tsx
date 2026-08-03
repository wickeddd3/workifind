"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActiveLink } from "@/shared/lib/is-active-link";
import { cn } from "@/shared/lib/utils";
import { MenubarItem } from "@/shared/ui/menubar";

export function MobileMenuNavLink({
  title = "",
  link = "/",
  icon: Icon,
  exact,
}: {
  title: string;
  link: string;
  icon?: LucideIcon;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = isActiveLink(pathname, link, exact);

  return (
    <MenubarItem asChild>
      <Link
        href={link}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 text-sm font-medium",
          isActive ? "text-primary" : "text-foreground",
        )}
      >
        {Icon && <Icon size={16} className="shrink-0" aria-hidden="true" />}
        {title}
      </Link>
    </MenubarItem>
  );
}
