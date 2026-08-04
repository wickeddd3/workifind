import { MousePointerClick } from "lucide-react";

export function EmptyPlaceholder() {
  return (
    <section className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <MousePointerClick size={30} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground lg:text-xl">
          Pick a company to preview
        </h2>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground lg:text-md">
          Select a company from the list to see what they do and what they are
          hiring for.
        </p>
      </div>
    </section>
  );
}
