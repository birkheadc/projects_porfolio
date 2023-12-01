import KEY from "./KEY";

export default function(token: string) {
  window.localStorage.setItem(KEY, token);
}