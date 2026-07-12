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
      className="text-xs font-medium text-gray-600 transition-colors hover:text-indigo-600 md:text-sm"
    >
      {title}
    </Link>
  );
}
