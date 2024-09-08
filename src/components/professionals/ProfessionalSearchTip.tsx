import { BookUser, BrainCog, FileSliders } from "lucide-react";
import { ReactElement } from "react";

interface TipProps {
  tip: { icon: ReactElement; title: string; description: string };
}

export default function ProfessionalSearchTip() {
  const tips = [
    {
      icon: <BookUser size={60} color="#3366FF" strokeWidth={1} />,
      title: "Personal Information",
      description: "Find out about the professionals information",
    },
    {
      icon: <BrainCog size={60} color="#3366FF" strokeWidth={1} />,
      title: "Skills and Qualifications",
      description:
        "Find professional skills and qualifications match your preference",
    },
    {
      icon: <FileSliders size={60} color="#3366FF" strokeWidth={1} />,
      title: "Preference",
      description:
        "Find professionals preference that closely match your position you're hiring",
    },
  ];

  const Tip = ({ tip: { icon, title, description } }: TipProps) => {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        {icon}
        <h4 className="text-center text-md font-medium text-gray-900 md:text-lg lg:text-xl">
          {title}
        </h4>
        <p className="text-center text-sm text-gray-800 md:text-md">
          {description}
        </p>
      </div>
    );
  };

  return (
    <section className="flex w-full flex-col items-center gap-12 py-6">
      <h1 className="text-lg font-semibold text-gray-900 md:text-xl lg:text-2xl">
        Get the full picture before you hire
      </h1>
      <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
        {tips.map((tip) => (
          <Tip tip={tip} key={tip.title} />
        ))}
      </div>
    </section>
  );
}
