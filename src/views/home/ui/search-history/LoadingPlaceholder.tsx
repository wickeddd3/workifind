export function LoadingPlaceholder() {
  return (
    <section className="flex w-full flex-col gap-4 py-2 md:py-4">
      <div className="flex items-center justify-between gap-8">
        <h2 className="text-md font-semibold text-foreground md:text-lg lg:text-xl">
          Recent searches
        </h2>
        <span className="h-9 w-28 animate-pulse rounded-lg bg-muted"></span>
      </div>
      <div className="flex h-full w-full items-center gap-2">
        <span className="h-9 w-11 shrink-0 animate-pulse rounded-lg bg-muted"></span>
        <div className="flex w-full gap-3 overflow-hidden">
          <span className="h-9 w-40 shrink-0 animate-pulse rounded-lg bg-muted"></span>
          <span className="h-9 w-40 shrink-0 animate-pulse rounded-lg bg-muted"></span>
          <span className="h-9 w-40 shrink-0 animate-pulse rounded-lg bg-muted"></span>
        </div>
        <span className="h-9 w-11 shrink-0 animate-pulse rounded-lg bg-muted"></span>
      </div>
    </section>
  );
}
