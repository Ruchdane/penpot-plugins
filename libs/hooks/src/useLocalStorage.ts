import { useState, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const getInitialValue = () => {
    try {
      const item = sessionStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }

      return initialValue instanceof Function ? initialValue() : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
  };

  const [state, setState] = useState<T>(getInitialValue);

  const setValue = useCallback((value: T) => {
    setState(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  }, []);

  return [state, setValue];
}
