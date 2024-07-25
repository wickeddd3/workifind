export default function CompanyFilter() {
  return (
    <section className="flex min-h-[340px] items-center justify-between rounded-2xl bg-gray-50 px-8 py-12">
      <div className="flex w-full grow flex-col space-y-4">
        <h1 className="text-4xl font-semibold text-gray-900">
          Find your next potential company
        </h1>
        <h5 className="text-xl font-medium text-gray-700">
          Explore list of companies you can apply with
        </h5>
        <input
          type="text"
          placeholder="Search by company name"
          className="p-3"
        />
      </div>
      <div className="flex flex-none items-center justify-center px-14">
        <div className="h-[220px] w-[220px] rounded-full bg-gray-200"></div>
      </div>
    </section>
  );
}
