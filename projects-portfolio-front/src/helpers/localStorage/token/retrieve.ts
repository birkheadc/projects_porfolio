import KEY from "./KEY";

export default function(): string | null {
  const token = window.localStorage.getItem(KEY);
  if (token == null) return null;
  return token;
}