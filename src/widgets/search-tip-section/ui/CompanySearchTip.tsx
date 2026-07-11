import { Gift, HandHeart, MapPinnedIcon } from "lucide-react";
import { type ReactElement } from "react";

interface TipProps {
  tip: { icon: ReactElement; title: string; description: string };
}

export function CompanySearchTip() {
  const tips = [
    {
      icon: (
        <HandHeart
          size={60}
          className="text-indigo-600"
          strokeWidth={1}
          aria-hidden="true"
        />
      ),
      title: "Culture and values",
      description: "Find out about the company culture",
    },
    {
      icon: (
        <Gift
          size={60}
          className="text-indigo-600"
          strokeWidth={1}
          aria-hidden="true"
        />
      ),
      title: "Perks and benefits",
      description: "Find perks that matter to you",
    },
    {
      icon: (
        <MapPinnedIcon
          size={60}
          className="text-indigo-600"
          strokeWidth={1}
          aria-hidden="true"
        />
      ),
      title: "Where it's located",
      description: "Find location match your preference",
    },
  ];

  const Tip = ({ tip: { icon, title, description } }: TipProps) => {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        {icon}
        <h3 className="text-center text-md font-medium text-gray-900 md:text-lg lg:text-xl">
          {title}
        </h3>
        <p className="text-center text-sm text-gray-800 md:text-md">
          {description}
        </p>
      </div>
    );
  };

  return (
    <section className="flex w-full flex-col items-center gap-12 py-6">
      <h2 className="text-lg font-semibold text-gray-900 md:text-xl lg:text-2xl">
        Get the full picture before you apply
      </h2>
      <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
        {tips.map((tip) => (
          <Tip tip={tip} key={tip.title} />
        ))}
      </div>
    </section>
  );
}
