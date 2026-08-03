/**
 * The company profile's sections, in the order the page renders them.
 *
 * The ids match the edit page's and the completeness model's, so an anchor and
 * a "fill this in" prompt both land on the same panel. `identity` is absent
 * deliberately: the header it names sits in the rail, so a jump link to it
 * would scroll past the profile to reach something already on screen.
 */
export const COMPANY_SECTIONS = [
  { id: "overview", title: "Company overview" },
  { id: "about", title: "About us" },
  { id: "culture", title: "Why join us?" },
  { id: "perks", title: "Perks" },
] as const;
