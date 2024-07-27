import { Gift, HandHeart, MapPinnedIcon } from "lucide-react";
import { ReactElement } from "react";

interface TipProps {
  tip: { icon: ReactElement; title: string; description: string };
}

export default function CompanySearchTip() {
  const tips = [
    {
      icon: <HandHeart size={120} color="#3366FF" strokeWidth={1} />,
      title: "Culture and values",
      description: "Find out about the company culture",
    },
    {
      icon: <Gift size={120} color="#3366FF" strokeWidth={1} />,
      title: "Perks and benefits",
      description: "Find perks that matter to you",
    },
    {
      icon: <MapPinnedIcon size={120} color="#3366FF" strokeWidth={1} />,
      title: "Where it's located",
      description: "Find location match your preference",
    },
  ];

  const Tip = ({ tip: { icon, title, description } }: TipProps) => {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        {icon}
        <h4 className="text-xl font-medium text-gray-900">{title}</h4>
        <p className="text-md text-center text-gray-800">{description}</p>
      </div>
    );
  };

  return (
    <section className="flex flex-col items-center space-y-12 py-6">
      <h1 className="text-3xl font-semibold text-gray-900">
        Get the full picture before you apply
      </h1>
      <div className="flex w-full items-center justify-center space-x-12">
        {tips.map((tip) => (
          <Tip tip={tip} key={tip.title} />
        ))}
      </div>
    </section>
  );
}
