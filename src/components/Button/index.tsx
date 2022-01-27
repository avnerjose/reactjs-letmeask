import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...rest }: ButtonProps) {
  return (
    <button
      className={styles["button"].concat(
        isOutlined ? " " + styles["outlined"] : " "
      )}
      {...rest}
    ></button>
  );
}
