export function objectToFormData(values: object) {
  const formData = new FormData();

  if (!(typeof values === "object")) return formData;

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else if (value) {
      formData.append(key, value);
    }
  });

  return formData;
}
