export function ApplicantJobsLoadingPlaceholder() {
  return (
    <div className="m-auto w-full animate-pulse space-y-6 px-4">
      <div className="h-8 w-1/4 rounded bg-muted"></div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="flex flex-col gap-2 rounded-lg bg-muted px-4 py-2 hover:bg-muted"
            key={index}
          >
            <div className="flex items-center justify-between">
              <div className="h-7 w-2/5 rounded bg-muted"></div>
              <span className="h-7 w-7 rounded-lg bg-muted"></span>
            </div>
            <div className="flex flex-col gap-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex w-1/4 items-center gap-1.5" key={index}>
                  <span className="h-4 w-4 rounded-full bg-muted"></span>
                  <p className="h-3 w-full rounded bg-muted"></p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
