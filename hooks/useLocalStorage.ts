import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): ReactState<T> {
  const [value, setValue] = useState<T>(initialValue);

  // Initialize the value from local storage
  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (!item) return;
    setValue(JSON.parse(item));
  }, []);

  // Update local storage when the value changes
  // Note: This useEffect should be run after the initial value is set (previous useEffect)
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Update the value when the local storage changes
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue) setValue(JSON.parse(event.newValue));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [value, setValue];
}
