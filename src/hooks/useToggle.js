import { useState, useCallback } from "react";

/**
 * Simple boolean toggle state.
 * @param {boolean} [initial=false]
 * @returns {[boolean, () => void, (boolean) => void]}
 */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue];
}
