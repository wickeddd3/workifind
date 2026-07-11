export function FooterLogo() {
  return (
    <div className="flex w-fit items-center gap-2">
      <div
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-neutral-100"
      >
        <span className="text-center align-middle text-lg font-extrabold">
          W
        </span>
      </div>
      <span className="text-xl font-extrabold tracking-wider text-gray-800">
        workifind
      </span>
    </div>
  );
}
