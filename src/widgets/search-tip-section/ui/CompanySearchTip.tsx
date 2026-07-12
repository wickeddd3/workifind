import { Gift, HandHeart, MapPinnedIcon } from "lucide-react";

import { type SearchTip, SearchTipSection } from "./SearchTipSection";

const tips: SearchTip[] = [
  {
    icon: <HandHeart size={24} aria-hidden="true" />,
    title: "Culture and values",
    description: "See what the company stands for before you apply.",
  },
  {
    icon: <Gift size={24} aria-hidden="true" />,
    title: "Perks and benefits",
    description: "Discover the perks that actually matter to you.",
  },
  {
    icon: <MapPinnedIcon size={24} aria-hidden="true" />,
    title: "Where it's located",
    description: "Check whether the location fits how you want to work.",
  },
];

export function CompanySearchTip() {
  return (
    <SearchTipSection
      heading="Get the full picture before you apply"
      tips={tips}
    />
  );
}
