import Link from "next/link";
import type { IconType } from "react-icons";

export function SocialLink({
  icon: Icon,
  url = "",
  label,
}: {
  icon: IconType;
  url: string;
  label: string;
}) {
  return (
    <Link
      href={url}
      aria-label={label}
      className="rounded-lg p-1 hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
    >
      <Icon size="1.5em" className="text-gray-600" aria-hidden="true" />
    </Link>
  );
}
