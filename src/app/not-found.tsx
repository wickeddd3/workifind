import Link from "next/link";

export default function NotFound() {
  return (
    <main className="m-auto flex h-[70vh] w-full max-w-7xl items-center justify-center md:h-[80vh]">
      <section className="flex h-1/2 w-full flex-col items-center justify-end bg-not-found bg-center bg-no-repeat md:w-1/2">
        <Link
          href="/"
          className="z-10 rounded-xl bg-emerald-500 px-4 py-2 font-bold text-white shadow-md"
        >
          Go to homepage
        </Link>
      </section>
    </main>
  );
}
