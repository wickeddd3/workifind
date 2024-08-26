export default function EmployerDetailsLoadingPlaceholder() {
  return (
    <section className="flex animate-pulse flex-col space-y-6 px-4">
      <div className="h-[140px] w-[140px] rounded-xl bg-gray-200"></div>
      <div className="flex flex-col space-y-3">
        <p className="h-8 w-2/4 rounded bg-gray-200"></p>
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="flex w-1/3 items-center gap-1.5" key={index}>
            <span className="h-5 w-6 rounded-full bg-gray-200"></span>
            <p className="h-5 w-full rounded bg-gray-200"></p>
          </div>
        ))}
      </div>
      <p className="h-10 w-[130px] rounded bg-gray-200"></p>
      <div className="border-b-2 border-gray-200">
        <div className="flex gap-8 pb-1">
          {Array.from({ length: 2 }).map((_, index) => (
            <span className="h-5 w-[100px] bg-gray-200" key={index}></span>
          ))}
        </div>
      </div>
      <div className="py-10">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <h1 className="h-7 w-1/4 rounded bg-gray-200"></h1>
            {Array.from({ length: 2 }).map((_, index) => (
              <div className="flex items-center space-x-12" key={index}>
                <h3 className="h-5 w-[100px] rounded bg-gray-200"></h3>
                <p className="h-4 w-[180px] rounded bg-gray-200"></p>
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="h-7 w-1/4 rounded bg-gray-200"></h1>
            <h1 className="h-32 w-full rounded bg-gray-200"></h1>
          </div>
        </div>
      </div>
    </section>
  );
}
