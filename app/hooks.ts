import { useEffect, useState } from 'react';

export const useDebounce = <T>(defaultValue: T, newValue: T, milliseconds: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(newValue);
    }, milliseconds);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [newValue, milliseconds]);

  return debouncedValue;
};
