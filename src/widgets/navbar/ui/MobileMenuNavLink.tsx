"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/utils";
import { MenubarItem } from "@/shared/ui/menubar";

export function MobileMenuNavLink({
  title = "",
  link = "/",
  icon: Icon,
}: {
  title: string;
  link: string;
  icon?: LucideIcon;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === link || (link !== "/" && pathname.startsWith(`${link}/`));

  return (
    <MenubarItem asChild>
      <Link
        href={link}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 text-sm font-medium",
          isActive ? "text-indigo-600" : "text-gray-700",
        )}
      >
        {Icon && <Icon size={16} className="shrink-0" aria-hidden="true" />}
        {title}
      </Link>
    </MenubarItem>
  );
}
