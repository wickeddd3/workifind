export type Role = "APPLICANT" | "EMPLOYER";

export const profileRoute = (role: Role | undefined) => {
  if (role === "APPLICANT") {
    return "/applicant/profile";
  }
  if (role === "EMPLOYER") {
    return "/employer/profile";
  }
  return "/setup";
};
