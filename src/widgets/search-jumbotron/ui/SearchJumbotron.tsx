import IconSearch from "@/shared/ui/icons/IconSearch";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export function SearchJumbotron({
  title,
  subtitle,
  placeholder,
  searchAction,
}: {
  title: string;
  subtitle: string;
  placeholder: string;
  searchAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <section className="flex h-full w-full items-center justify-between rounded-2xl bg-gray-50 px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      <div className="flex w-full grow flex-col space-y-4">
        <h1 className="text-balance text-xl font-semibold text-gray-900 md:text-2xl lg:text-3xl">
          {title}
        </h1>
        <h5 className="text-balance text-md font-medium text-gray-700 md:text-lg lg:text-xl">
          {subtitle}
        </h5>
        <form
          action={searchAction}
          key="form-filter"
          className="flex w-full gap-2"
        >
          <Input
            id="q"
            name="q"
            type="text"
            placeholder={placeholder}
            className="w-full"
          />
          <Button className="bg-indigo-600 hover:bg-indigo-700">Search</Button>
        </form>
      </div>
      <div className="hidden items-center justify-center px-14 md:flex">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[180px] w-[180px] rounded-full bg-white shadow-md"></div>
          <IconSearch width={240} height={240} className="z-10" />
        </div>
      </div>
    </section>
  );
}
