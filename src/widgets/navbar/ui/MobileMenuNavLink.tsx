import { MenubarItem, MenubarShortcut } from "@/shared/ui/menubar";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export function MobileMenuNavLink({
  title = "",
  link = "/",
  icon: Icon,
}: {
  title: string;
  link: string;
  icon?: LucideIcon;
}) {
  return (
    <MenubarItem asChild>
      <Link
        href={link}
        className="flex w-full cursor-pointer items-center gap-3"
      >
        <span className="w-full text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
          {title}
        </span>
        {Icon && <MenubarShortcut>{<Icon size="16" />}</MenubarShortcut>}
      </Link>
    </MenubarItem>
  );
}
