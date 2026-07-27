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
      className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary md:text-sm"
    >
      {title}
    </Link>
  );
}
