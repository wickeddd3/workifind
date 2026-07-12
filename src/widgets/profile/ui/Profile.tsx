import { type ReactNode } from "react";

import { NavigationListItem } from "./NavigationListItem";

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
      className="w-full border-b border-gray-100 lg:w-[280px] lg:shrink-0 lg:border-b-0 lg:border-e"
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
    <ul className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:space-y-1 lg:overflow-visible lg:pb-0">
      {children}
    </ul>
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
