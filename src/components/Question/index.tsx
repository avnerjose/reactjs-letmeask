import { ReactNode } from "react";
import cx from "classnames";
import "./styles.scss";

type QuestionProps = {
  children: ReactNode;
  content: string;
  isAnswered?: boolean;
  isHighlighted?: boolean;
  author: {
    name: string;
    avatar: string;
  };
};

export function Question({
  children,
  content,
  isAnswered = false,
  isHighlighted = false,
  author: { name, avatar },
}: QuestionProps) {
  return (
    <div
      className={cx("question", {
        answered: isAnswered,
        highlighted: isHighlighted && !isAnswered,
      })}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={avatar} alt={name} />
          <span>{name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
