import IconBrand from "@/shared/ui/icons/IconBrand";

export function FooterLogo() {
  return (
    <div className="flex w-fit items-center gap-2">
      <IconBrand className="h-8 w-8 shrink-0" />
      <span className="text-xl font-extrabold tracking-wider text-gray-800">
        workifind
      </span>
    </div>
  );
}
