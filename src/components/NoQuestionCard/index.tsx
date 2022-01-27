import noQuestionImg from "../../assets/images/empty-questions.svg";
import styles from "./styles.module.scss";

export function NoQuestionCard() {
  return (
    <div className={styles["card"]}>
      <img src={noQuestionImg} alt="Nenhuma pergunta" />
      <h2>Nenhuma pergunta por aqui...</h2>
      <p>
        Envie o código desta sala para seus amigos e comece a responder
        perguntas!
      </p>
    </div>
  );
}
