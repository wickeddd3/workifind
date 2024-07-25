export default function CompanySearchFilter() {
  return (
    <section className="flex flex-col space-y-8 py-6">
      <h1 className="text-3xl font-medium">
        Search results for &quot;accenture&ldquo;
      </h1>
      <input
        type="text"
        placeholder="Search by company name"
        className="rounded-lg border-2 border-gray-500 p-3"
      />
    </section>
  );
}
