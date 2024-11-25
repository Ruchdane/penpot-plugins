import { useState, useCallback } from "react";

export function useToggle(initialValue: boolean = false) {
  const [state, setState] = useState(initialValue);
  return [
    state,
    useCallback(() => {
      setState((v) => !v);
    }, []),
  ] as const;
}
