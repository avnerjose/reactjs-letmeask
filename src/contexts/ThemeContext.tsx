import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

import { ThemeProvider } from "styled-components";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";

type Theme = "light" | "dark";

type ThemeContextProviderProps = {
  children: ReactNode;
};

type ThemeContextProps = {
  toggleTheme: () => void;
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    const cookieTheme = Cookies.get("letMeAsk:theme");

    if (cookieTheme) {
      setTheme(cookieTheme as Theme);
    }
  }, []);

  useEffect(() => {
    Cookies.set("letMeAsk:theme", theme);
  }, [theme]);

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
