import { type ReactElement } from "react";

export interface SearchTip {
  icon: ReactElement;
  title: string;
  description: string;
}

export function SearchTipSection({
  heading,
  tips,
}: {
  heading: string;
  tips: SearchTip[];
}) {
  return (
    <section className="flex w-full flex-col items-center gap-8 py-6">
      <h2 className="text-center text-lg font-semibold text-gray-900 md:text-xl lg:text-2xl">
        {heading}
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {tips.map((tip) => (
          <div
            key={tip.title}
            className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              {tip.icon}
            </div>
            <h3 className="text-md font-semibold text-gray-900">{tip.title}</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
