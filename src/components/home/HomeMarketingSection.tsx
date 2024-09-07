import IllustrationJobHunt from "@/components/illustrations/IllustrationJobHunt";
import IllustrationJobOffer from "@/components/illustrations/IllustrationJobOffer";

export default function HomeMarketingSection() {
  return (
    <section className="grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="h-full w-full">
        <div className="flex w-full flex-col flex-wrap items-center justify-center rounded-2xl bg-gray-50 p-4 md:flex-row md:flex-nowrap md:justify-between md:p-4">
          <h1 className="text-balance px-4 text-center text-lg font-extrabold tracking-wider text-indigo-500 md:text-start md:text-xl lg:text-2xl">
            Search for better career and salary
          </h1>
          <div className="relative flex items-center justify-center">
            <IllustrationJobHunt width={180} height={180} className="z-10" />
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <div className="flex w-full flex-col flex-wrap items-center justify-center rounded-2xl bg-gray-50 p-4 md:flex-row md:flex-nowrap md:justify-between md:p-4">
          <h1 className="text-balance px-4 text-center text-lg font-extrabold tracking-wider text-indigo-500 md:text-start md:text-xl lg:text-2xl">
            Hire talents that match your preference
          </h1>
          <div className="relative flex items-center justify-center">
            <IllustrationJobOffer width={180} height={180} className="z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
