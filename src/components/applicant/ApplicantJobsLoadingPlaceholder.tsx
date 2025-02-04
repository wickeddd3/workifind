export default function ApplicantJobsLoadingPlaceholder() {
  return (
    <main className="m-auto w-full animate-pulse space-y-6 px-4">
      <h1 className="h-8 w-1/4 rounded bg-gray-200"></h1>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="flex flex-col gap-2 rounded-lg bg-gray-50 px-4 py-2 hover:bg-gray-100"
            key={index}
          >
            <div className="flex items-center justify-between">
              <h3 className="h-7 w-2/5 rounded bg-gray-200"></h3>
              <span className="h-7 w-7 rounded-lg bg-gray-200"></span>
            </div>
            <div className="flex flex-col gap-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex w-1/4 items-center gap-1.5" key={index}>
                  <span className="h-4 w-4 rounded-full bg-gray-200"></span>
                  <p className="h-3 w-full rounded bg-gray-200"></p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
