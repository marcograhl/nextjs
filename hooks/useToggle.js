import { useState } from "react";

export function useToggle(initialState) {
  const [value, setValue] = useState(initialState);
  const toggle = () => setValue((current) => !current);
  return [value, toggle, setValue];
}
