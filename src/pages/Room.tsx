import { push, ref, remove, set } from "firebase/database";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import darkLogoImg from "../assets/images/darklogo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../contexts/AuthContext";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import { ReactComponent as LikeIcon } from "../assets/images/like.svg";

import { Container } from "../styles/Pages/room";
import { NoQuestionCard } from "../components/NoQuestionCard";
import { useThemeContext } from "../contexts/ThemeContext";
import { ThemeSwitch } from "../components/ThemeSwitch";

type HandleLikeQuestionProps = {
  questionId: string;
  likeId: string | null;
};

export function Room() {
  const { user } = useAuth();
  const { id: roomId } = useParams();
  const [newQuestion, setNewQuestion] = useState("");
  const { theme } = useThemeContext();
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
    <Container>
      <header>
        <div className="content">
          <img src={theme === "light" ? logoImg : darkLogoImg} alt="LetMeAsk" />
          <div>
            <RoomCode code={String(roomId)} />
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="o que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
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
        <div className="question-list">
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
    </Container>
  );
}
