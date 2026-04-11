import Link from "next/link";

export function FooterLink({
  title = "",
  url = "",
}: {
  title: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      className="text-xs font-medium text-gray-900 hover:text-indigo-700 md:text-sm"
    >
      {title}
    </Link>
  );
}
