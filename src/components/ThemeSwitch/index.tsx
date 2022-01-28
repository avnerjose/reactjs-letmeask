import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { useThemeContext } from "../../contexts/ThemeContext";
import { Container } from "./styles";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Container
      checked={theme === "dark"}
      onChange={toggleTheme}
      checkedIcon={<BsFillMoonFill />}
      uncheckedIcon={<BsSunFill />}
      className={`switch ${theme === "dark" ? "checked" : ""}`}
      onColor="#835afd"
      offColor="#8FB5F5"
    />
  );
}
