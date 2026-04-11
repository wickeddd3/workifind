export function LoadingPlaceholder() {
  return (
    <section className="flex w-full flex-col gap-4 py-2 md:py-4">
      <div className="flex items-center justify-between gap-8">
        <h1 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
          Filter history
        </h1>
        <span className="h-9 w-28 rounded-lg bg-gray-200"></span>
      </div>
      <div className="flex h-full w-full gap-2 py-2">
        <span className="h-9 w-12 rounded-lg bg-gray-200"></span>
        <div className="h-9 w-full rounded-lg bg-gray-200"></div>
        <span className="h-9 w-12 rounded-lg bg-gray-200"></span>
      </div>
    </section>
  );
}
