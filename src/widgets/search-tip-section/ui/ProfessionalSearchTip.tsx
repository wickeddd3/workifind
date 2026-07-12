import { BookUser, BrainCog, FileSliders } from "lucide-react";

import { type SearchTip, SearchTipSection } from "./SearchTipSection";

const tips: SearchTip[] = [
  {
    icon: <BookUser size={24} aria-hidden="true" />,
    title: "Personal information",
    description: "Get to know each candidate's background at a glance.",
  },
  {
    icon: <BrainCog size={24} aria-hidden="true" />,
    title: "Skills and qualifications",
    description: "See the skills and qualifications that fit your role.",
  },
  {
    icon: <FileSliders size={24} aria-hidden="true" />,
    title: "Preferences",
    description:
      "Find candidates whose preferences match the role you're hiring for.",
  },
];

export function ProfessionalSearchTip() {
  return (
    <SearchTipSection
      heading="Get the full picture before you hire"
      tips={tips}
    />
  );
}
