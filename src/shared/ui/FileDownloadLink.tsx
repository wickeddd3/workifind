import { Download, FileText } from "lucide-react";

import { cn } from "@/shared/lib/utils";

/**
 * A stored file, presented as something to download.
 *
 * Knows nothing about what the file is — it is rendered for a résumé on a
 * profile and for the résumé attached to an application, and those live in two
 * entities that cannot import each other.
 *
 * A plain `<a>`, not a fetch: the response carries a `Content-Disposition`, so
 * the browser saves it and the page never has to hold the bytes. `download` is
 * left off deliberately — the header already names the file, and the attribute
 * is ignored for cross-origin responses anyway, so relying on it would make the
 * filename depend on where the file happens to be served from.
 */
export function FileDownloadLink({
  href,
  name,
  meta,
  className,
}: {
  href: string;
  name: string;
  /** A line under the name — when it was uploaded, how big it is. */
  meta?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex max-w-full items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <FileText
        size={20}
        className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        aria-hidden="true"
      />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-foreground">
          {name}
        </span>
        {meta && (
          <span className="truncate text-xs text-muted-foreground">{meta}</span>
        )}
      </span>
      <Download
        size={16}
        className="ml-auto shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        aria-hidden="true"
      />
      <span className="sr-only">Download</span>
    </a>
  );
}
