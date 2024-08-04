export function objectToFormData(values: object) {
  const formData = new FormData();

  if (!(typeof values === "object")) return formData;

  Object.entries(values).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  return formData;
}
