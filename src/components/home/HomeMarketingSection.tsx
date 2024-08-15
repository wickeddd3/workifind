import IllustrationJobHunt from "@/components/illustrations/IllustrationJobHunt";
import IllustrationJobOffer from "@/components/illustrations/IllustrationJobOffer";

export default function HomeMarketingSection() {
  return (
    <section className="flex w-full flex-wrap items-center justify-between gap-4">
      <div className="w-full md:min-h-[300px] xl:w-[47%]">
        <div className="flex w-full flex-wrap items-center justify-center rounded-2xl bg-gray-50 p-8 md:flex-nowrap lg:justify-between">
          <h1 className="text-wrap px-4 text-center font-mono text-xl font-semibold tracking-wider text-gray-800 md:text-start md:text-3xl">
            Search for better career and salary
          </h1>
          <div className="relative flex items-center justify-center">
            <div className="absolute h-[200px] w-[200px] rounded-full bg-gray-200 shadow-md"></div>
            <IllustrationJobHunt width={240} height={240} className="z-10" />
          </div>
        </div>
      </div>
      <div className="w-full md:min-h-[300px] xl:w-[47%]">
        <div className="flex w-full flex-wrap items-center justify-center rounded-2xl bg-gray-50 p-8 md:flex-nowrap lg:justify-between">
          <h1 className="text-wrap px-4 text-center font-mono text-xl font-semibold tracking-wider text-gray-800 md:text-start md:text-3xl">
            Hire professionals that match your preference
          </h1>
          <div className="relative flex items-center justify-center">
            <div className="absolute h-[200px] w-[200px] rounded-full bg-gray-200 shadow-md"></div>
            <IllustrationJobOffer width={240} height={240} className="z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
