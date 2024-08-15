import IllustrationJobHunt from "@/components/illustrations/IllustrationJobHunt";
import IllustrationJobOffer from "@/components/illustrations/IllustrationJobOffer";

export default function HomeMarketingSection() {
  return (
    <section className="flex w-full flex-wrap items-center justify-between">
      <div className="h-[300px] w-[48%]">
        <div className="flex w-full items-center justify-end rounded-2xl bg-gray-50 p-8">
          <h1 className="text-wrap px-4 font-mono text-3xl font-semibold tracking-wider text-gray-800">
            Search for better career and salary
          </h1>
          <div className="relative flex items-center justify-center">
            <div className="absolute h-[200px] w-[200px] rounded-full bg-gray-200 shadow-md"></div>
            <IllustrationJobHunt width={240} height={240} className="z-10" />
          </div>
        </div>
      </div>
      <div className="h-[300px] w-[48%]">
        <div className="flex w-full items-center justify-end rounded-2xl bg-gray-50 p-8">
          <h1 className="text-wrap px-4 font-mono text-3xl font-semibold tracking-wider text-gray-800">
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
