import Image from "next/image";
import imageLogoPlaceholder from "@/assets/workifind-logo.svg";

export default function CompanySearchResultItem() {
  return (
    <article className="flex cursor-pointer items-center space-x-4 rounded-md border-2 border-gray-100 p-2 hover:bg-gray-50">
      <Image
        src={imageLogoPlaceholder}
        width={120}
        height={100}
        alt="Company logo"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-medium text-gray-900">company name</h3>
        <h4 className="text-md text-gray-700">industry</h4>
        <h5 className="text-sm">location</h5>
        <span className="flex w-fit rounded-xl bg-gray-300 px-2">
          <span className="w-full p-1 text-xs font-semibold">8 jobs</span>
        </span>
      </div>
    </article>
  );
}
