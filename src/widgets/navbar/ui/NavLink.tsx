import Link from "next/link";

export function NavLink({
  title = "",
  link = "/",
}: {
  title: string;
  link: string;
}) {
  return (
    <Link href={link} className="flex items-center gap-3">
      <span className="text-sm font-medium tracking-wide text-gray-800 hover:text-indigo-600">
        {title}
      </span>
    </Link>
  );
}
