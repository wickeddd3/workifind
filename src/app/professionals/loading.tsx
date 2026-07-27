// Mirrors `ProfessionalsPage`: search jumbotron, then a row of professional cards.
export default function Loading() {
  return (
    <div className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <section className="h-[220px] w-full animate-pulse rounded-2xl border border-indigo-100/70 bg-gradient-to-br from-indigo-50 via-white to-white shadow-card md:h-[248px]" />
      <section className="flex flex-col space-y-2 py-6">
        <div className="h-6 w-60 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-80 animate-pulse rounded bg-gray-100" />
        <div className="flex gap-4 overflow-hidden py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[130px] w-[276px] shrink-0 animate-pulse rounded-xl border border-gray-100 bg-white shadow-card"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
