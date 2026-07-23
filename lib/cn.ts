type ClassValue = string | false | null | undefined;

/** Joins conditional className strings, skipping falsy values. */
export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}
