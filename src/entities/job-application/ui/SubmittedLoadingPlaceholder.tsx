export function SubmittedLoadingPlaceholder() {
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
      <div className="flex flex-col gap-6">
        <p className="h-96 w-full rounded bg-muted"></p>
        <div className="flex justify-center">
          <p className="h-8 w-4/6 rounded bg-muted"></p>
        </div>
      </div>
    </section>
  );
}
