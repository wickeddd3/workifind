import Link from "next/link";
import { type ReactNode } from "react";

interface ProfileProps {
  children: ReactNode;
}

export function Profile({ children }: ProfileProps) {
  return (
    <div className="mx-auto my-0 flex h-full max-w-7xl flex-col md:pt-10 lg:flex-row">
      {children}
    </div>
  );
}

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div
      id="application-sidebar"
      className="w-full border-b border-gray-100 transition-all duration-300 dark:border-neutral-700 dark:bg-neutral-800 lg:w-[300px] lg:shrink-0 lg:border-b-0 lg:border-e"
    >
      {children}
    </div>
  );
}

interface NavigationProps {
  children: ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  return (
    <nav className="flex w-full flex-col flex-wrap p-4 lg:p-6">{children}</nav>
  );
}

interface NavigationListProps {
  children: ReactNode;
}

export function NavigationList({ children }: NavigationListProps) {
  return (
    <ul className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:space-y-1.5 lg:overflow-visible lg:pb-0">
      {children}
    </ul>
  );
}

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
  return (
    <li className="shrink-0">
      <Link
        className="flex items-center gap-x-3.5 whitespace-nowrap rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:bg-neutral-700 dark:text-white"
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
