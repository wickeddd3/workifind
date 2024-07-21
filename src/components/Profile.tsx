import { ReactNode } from "react";
import Link from "next/link";

interface ProfileProps {
  children: ReactNode;
}

export function Profile({ children }: ProfileProps) {
  return <div className="mx-auto my-10 flex h-full max-w-7xl">{children}</div>;
}

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div
      id="application-sidebar"
      className="inset-y-0 start-0 z-[60] hidden min-h-[63vh] w-[300px] -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] dark:border-neutral-700 dark:bg-neutral-800 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0"
    >
      {children}
    </div>
  );
}

interface NavigationProps {
  children: ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  return <nav className="flex w-full flex-col flex-wrap p-6">{children}</nav>;
}

interface NavigationListProps {
  children: ReactNode;
}

export function NavigationList({ children }: NavigationListProps) {
  return <ul className="space-y-1.5">{children}</ul>;
}

interface NavigationListItemProps {
  icon: ReactNode;
  title: String;
  href: string;
}

export function NavigationListItem({
  icon = null,
  title = "",
  href = "/",
}: NavigationListItemProps) {
  return (
    <li>
      <Link
        className="flex items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-neutral-700 hover:bg-gray-100 dark:bg-neutral-700 dark:text-white"
        href={href}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
}

interface ContentProps {
  children: ReactNode;
}

export function Content({ children }: ContentProps) {
  return <div className="h-full w-full p-4">{children}</div>;
}

Profile.Sidebar = Sidebar;
Profile.Navigation = Navigation;
Profile.NavigationList = NavigationList;
Profile.NavigationListItem = NavigationListItem;
Profile.Content = Content;
