export const GENDER = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const;

export type Gender = typeof GENDER[number]["value"];