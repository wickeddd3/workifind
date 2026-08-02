"use client";

import { visibleMenuLinks } from "../model/navbar-links";
import { useUserRole } from "../model/use-user-role";
import { NavLink } from "./NavLink";

/**
 * The desktop menu links. Reads its own role rather than taking it as a prop,
 * so `Navbar` stays a server component that never touches auth — reading auth
 * there would opt every route in the app out of static rendering.
 */
export function NavMenuLinks() {
  const { role } = useUserRole();

  return (
    <>
      {visibleMenuLinks(role).map((item) => (
        <NavLink key={item.title} title={item.title} link={item.link} />
      ))}
    </>
  );
}
