import { BookUser, BrainCog, FileSliders } from "lucide-react";
import { ReactElement } from "react";

interface TipProps {
  tip: { icon: ReactElement; title: string; description: string };
}

export default function ProfessionalSearchTip() {
  const tips = [
    {
      icon: <BookUser size={120} color="#3366FF" strokeWidth={1} />,
      title: "Personal Information",
      description: "Find out about the professionals information",
    },
    {
      icon: <BrainCog size={120} color="#3366FF" strokeWidth={1} />,
      title: "Skills and Qualifications",
      description:
        "Find professional skills and qualifications match your preference",
    },
    {
      icon: <FileSliders size={120} color="#3366FF" strokeWidth={1} />,
      title: "Preference",
      description:
        "Find professionals preference that closely match your position you're hiring",
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
        Get the full picture before you hire
      </h1>
      <div className="flex w-full items-center justify-center space-x-12">
        {tips.map((tip) => (
          <Tip tip={tip} key={tip.title} />
        ))}
      </div>
    </section>
  );
}
