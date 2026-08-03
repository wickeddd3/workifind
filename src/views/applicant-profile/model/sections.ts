/**
 * The profile's sections, in the order the page renders them.
 *
 * The ids match the edit page's, so an anchor works on either. Kept as data so
 * the rail's jump links and the page cannot disagree about what exists or what
 * it is called — they did when the rail was written out by hand.
 */
export const PROFILE_SECTIONS = [
  { id: "about", title: "About me" },
  { id: "experience", title: "Work experience" },
  { id: "education", title: "Education" },
  { id: "certifications", title: "Certifications" },
  { id: "skills", title: "Skills" },
  { id: "languages", title: "Languages" },
  { id: "preferences", title: "Job preferences" },
] as const;

export type ProfileSectionId = (typeof PROFILE_SECTIONS)[number]["id"];
