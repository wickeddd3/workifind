export function removeObjectProperty<
  T extends Record<string, unknown>,
  K extends keyof T,
>(obj: T, key: K): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  return rest;
}
