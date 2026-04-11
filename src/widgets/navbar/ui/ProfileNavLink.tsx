import { NavLink } from "./NavLink";

export function ProfileNavLink({
  title = "",
  link = "/",
}: {
  title: string;
  link: string;
}) {
  return <NavLink title={title} link={link} />;
}
