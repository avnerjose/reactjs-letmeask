import { push, ref, remove, set } from "firebase/database";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../contexts/AuthContext";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import { ReactComponent as LikeIcon } from "../assets/images/like.svg";

import styles from "../styles/Pages/room.module.scss";
import { NoQuestionCard } from "../components/NoQuestionCard";

type HandleLikeQuestionProps = {
  questionId: string;
  likeId: string | null;
};

export function Room() {
  const { user } = useAuth();
  const { id: roomId } = useParams();
  const [newQuestion, setNewQuestion] = useState("");
  const { questions, title } = useRoom(roomId ?? "");

  async function handleLikeQuestion({
    questionId,
    likeId,
  }: HandleLikeQuestionProps) {
    if (!likeId) {
      const likeRef = ref(
        database,
        `rooms/${roomId}/questions/${questionId}/likes`
      );

      const newLikeRef = await push(likeRef);

      set(newLikeRef, {
        authorId: user?.id,
      });
    } else {
      const likeRef = ref(
        database,
        `rooms/${roomId}/questions/${questionId}/likes/${likeId}`
      );

      remove(likeRef);
    }
  }

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();
    if (newQuestion.trim() === "") return;

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    const questionRef = ref(database, `rooms/${roomId}/questions`);

    const newQuestionRef = await push(questionRef);

    set(newQuestionRef, question);

    setNewQuestion("");
  }

  return (
    <div className={styles["page-room"]}>
      <header>
        <div className={styles["content"]}>
          <img src={logoImg} alt="LetMeAsk" />
          <RoomCode code={String(roomId)} />
        </div>
      </header>

      <main className={styles["content"]}>
        <div className={styles["room-title"]}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="o que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className={styles["form-footer"]}>
            {user ? (
              <div className={styles["user-info"]}>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        <div className={styles["question-list"]}>
          {questions.map(
            ({
              id: questionId,
              content,
              author,
              likeCount,
              likeId,
              isAnswered,
              isHighlighted,
            }) => (
              <Question
                key={questionId}
                content={content}
                author={author}
                isAnswered={isAnswered}
                isHighlighted={isHighlighted}
              >
                {!isAnswered && (
                  <button
                    className={`like-button ${likeId ? "liked" : ""}`}
                    type="button"
                    aria-label="Like button"
                    onClick={() => handleLikeQuestion({ questionId, likeId })}
                  >
                    <span>{likeCount}</span>
                    <LikeIcon />
                  </button>
                )}
              </Question>
            )
          )}
          {!questions.length && <NoQuestionCard />}
        </div>
      </main>
    </div>
  );
}
