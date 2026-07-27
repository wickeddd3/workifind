export function ApplicantLoadingPlaceholder() {
  return (
    <section className="flex flex-col space-y-6 px-4 pb-8">
      <div className="flex h-[256px] w-full animate-pulse flex-col space-y-3 rounded-xl bg-muted p-8">
        <div className="flex w-2/4 items-center justify-between gap-4">
          <p className="h-8 w-full rounded bg-muted"></p>
          <span className="h-5 w-5 rounded-full bg-muted"></span>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="flex w-1/3 items-center gap-1.5" key={index}>
            <span className="h-4 w-5 rounded-full bg-muted"></span>
            <p className="h-4 w-full rounded bg-muted"></p>
          </div>
        ))}
        <p className="h-10 w-[130px] rounded bg-muted"></p>
      </div>
      <div className="flex flex-col gap-6 px-8">
        <div className="flex flex-col space-y-4">
          <div className="h-6 w-[110px] rounded bg-muted"></div>
          <div className="h-32 w-full rounded bg-muted"></div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="h-6 w-[110px] rounded bg-muted"></div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                className="h-7 w-24 rounded-full bg-muted"
                key={index}
              ></span>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="h-6 w-[110px] rounded bg-muted"></div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <span className="h-4 w-24 bg-muted" key={index}></span>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="h-6 w-[110px] rounded bg-muted"></div>
          <div className="flex flex-col gap-6 rounded-xl border-2 border-border p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="flex flex-col gap-3" key={index}>
                <div className="h-5 w-[170px] rounded bg-muted"></div>
                <span className="h-3 w-[140px] rounded bg-muted"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
