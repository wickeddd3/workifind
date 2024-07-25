import Image from "next/image";
import imageLogoPlaceholder from "@/assets/workifind-logo.svg";

export default function CompanyInitialList() {
  return (
    <section className="flex flex-col space-y-2 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Explore companies
      </h1>
      <h5 className="text-lg font-normal text-gray-700">
        Learn about new jobs and company culture.
      </h5>
      <div className="flex py-4">
        <div className="flex flex-col space-y-2 rounded-lg bg-gray-50 p-4 shadow-sm">
          <Image
            src={imageLogoPlaceholder}
            width={100}
            height={100}
            alt="Company logo"
          />
          <h3 className="text-md font-semibold">Accenture</h3>
          <h4 className="text-sm font-light">
            Information & Communication Technology
          </h4>
          <span className="flex w-fit rounded-xl bg-gray-300 px-2">
            <span className="w-full p-1 text-xs font-semibold">8 jobs</span>
          </span>
        </div>
      </div>
    </section>
  );
}
