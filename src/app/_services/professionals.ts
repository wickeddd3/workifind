import { baseUrl } from "@/lib/baseUrl";

export const getInitialProfessionalList = async (initialNumber?: number) => {
  const params = {
    size: initialNumber?.toString() || "",
  };
  const queryParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/professionals/initial?${queryParams}`,
  );

  return await response.json();
};
