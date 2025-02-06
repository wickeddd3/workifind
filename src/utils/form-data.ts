// excluded array is a list of excluded property to be converted to string
export function objectToFormData(values: object, excluded?: string[]) {
  const formData = new FormData();

  if (!(typeof values === "object")) return formData;

  Object.entries(values).forEach(([key, value]) => {
    const isExcluded = (excluded || []).some((item) => item === key);
    if (typeof value === "object" && !isExcluded) {
      formData.append(key, JSON.stringify(value));
    } else if (value) {
      formData.append(key, value);
    }
  });

  return formData;
}
