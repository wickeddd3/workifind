export function LoadingPlaceholder() {
  return (
    <section className="w-full grow animate-pulse space-y-8">
      <div className="flex w-full items-center gap-8">
        <div className="h-[140px] w-[175px] rounded-xl bg-muted"></div>
        <div className="flex w-full flex-col gap-2">
          <p className="h-4 w-1/4 rounded bg-muted"></p>
          <p className="h-9 w-2/4 rounded bg-muted"></p>
          <p className="h-7 w-1/4 rounded bg-muted"></p>
          <p className="h-4 w-1/4 rounded bg-muted"></p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 rounded-xl bg-muted p-4 md:p-8">
        <div className="flex w-2/4 items-center justify-between gap-4">
          <p className="h-9 w-full rounded bg-muted"></p>
          <span className="h-5 w-5 rounded-full bg-muted"></span>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="flex w-1/3 items-center gap-1.5" key={index}>
            <span className="h-4 w-5 rounded-full bg-muted"></span>
            <p className="h-4 w-full rounded bg-muted"></p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <p className="h-8 w-1/4 rounded bg-muted"></p>
        <div className="flex flex-col gap-1">
          <p className="h-3 w-full rounded bg-muted"></p>
          <p className="h-3 w-full rounded bg-muted"></p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="h-8 w-full rounded bg-muted"></p>
          <p className="h-36 w-full rounded bg-muted"></p>
        </div>
        <div className="flex justify-end">
          <span className="h-10 w-[150px] rounded bg-muted"></span>
        </div>
      </div>
    </section>
  );
}
