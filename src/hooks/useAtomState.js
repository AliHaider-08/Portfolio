import { useAtom } from 'jotai';
import { useEffect, useCallback } from 'react';
import { darkModeAtom } from '../atoms/atoms';

export const useDarkMode = () => {
  const [darkMode, setDarkModeState] = useAtom(darkModeAtom);

  // Enhanced setter that also saves to localStorage
  const setDarkMode = useCallback((value) => {
    const newValue = typeof value === 'function' ? value(darkMode) : value;
    setDarkModeState(newValue);
    localStorage.setItem('darkMode', String(newValue));
  }, [darkMode, setDarkModeState]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.colorScheme = "light";
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};
