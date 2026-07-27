"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface NavigationListItemProps {
  icon: ReactNode;
  title: string;
  href: string;
}

export function NavigationListItem({
  icon = null,
  title = "",
  href = "/",
}: NavigationListItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="shrink-0">
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center gap-x-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
}
