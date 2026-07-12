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
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        )}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
}
