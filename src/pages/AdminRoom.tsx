import { useState } from "react";
import { ref, remove, update } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { DeleteModal } from "../components/DeleteModal";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";
import darkLogoImg from "../assets/images/darklogo.svg";
import logoImg from "../assets/images/logo.svg";
import { ReactComponent as DeleteIcon } from "../assets/images/delete.svg";
import { ReactComponent as CheckIcon } from "../assets/images/check.svg";
import { ReactComponent as AnswerIcon } from "../assets/images/answer.svg";
import { Container } from "../styles/Pages/room";
import { database } from "../services/firebase";
import { NoQuestionCard } from "../components/NoQuestionCard";
import { ThemeSwitch } from "../components/ThemeSwitch";
import { useThemeContext } from "../contexts/ThemeContext";

export function AdminRoom() {
  const { id: roomId } = useParams();
  const { questions, title } = useRoom(roomId ?? "");
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const [isDeleteRoomModalOpen, setIsDeleteRoomModalOpen] = useState(false);
  const [isDeleteQuestionModalOpen, setIsDeleteQuestionModalOpen] =
    useState(false);
  const [questionToDeleteId, setQuestionToDeleteId] = useState("");

  async function handleDeleteQuestion() {
    const questionRef = ref(
      database,
      `rooms/${roomId}/questions/${questionToDeleteId}`
    );

    await remove(questionRef);
  }

  async function handleEndRoom() {
    const roomRef = ref(database, `rooms/${roomId}`);

    await update(roomRef, {
      endedAt: new Date(),
    });

    navigate("/");
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    const questionRef = ref(
      database,
      `rooms/${roomId}/questions/${questionId}`
    );

    await update(questionRef, {
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    const questionRef = ref(
      database,
      `rooms/${roomId}/questions/${questionId}`
    );

    await update(questionRef, {
      isHighlighted: true,
    });
  }

  return (
    <Container>
      <DeleteModal
        isModalOpen={isDeleteRoomModalOpen}
        handleDeleteItem={() => handleEndRoom()}
        handleCloseModal={() => setIsDeleteRoomModalOpen(false)}
        title="Encerrar sala"
        subtitle="Tem certeza que você deseja encerrar esta sala?"
        buttonText="Sim, encerrar"
      />
      <DeleteModal
        isModalOpen={isDeleteQuestionModalOpen}
        handleDeleteItem={() => handleDeleteQuestion()}
        handleCloseModal={() => setIsDeleteQuestionModalOpen(false)}
        title="Excluir pergunta"
        subtitle="Tem certeza que você deseja excluir essa pergunta?"
        buttonText="Sim, excluir"
      />
      <header>
        <div className="content">
          <img src={theme === "light" ? logoImg : darkLogoImg} alt="LetMeAsk" />
          <div>
            <RoomCode code={String(roomId)} />
            <Button isOutlined onClick={() => setIsDeleteRoomModalOpen(true)}>
              Encerrar sala
            </Button>
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(
            ({ id, content, author, isAnswered, isHighlighted }) => (
              <Question
                key={id}
                content={content}
                author={author}
                isAnswered={isAnswered}
                isHighlighted={isHighlighted}
              >
                <div className="buttons">
                  {!isAnswered && (
                    <>
                      <CheckIcon
                        onClick={() => handleCheckQuestionAsAnswered(id)}
                        className={isAnswered ? "active" : ""}
                      />
                      <AnswerIcon
                        onClick={() => handleHighlightQuestion(id)}
                        className={isHighlighted ? "active" : ""}
                      />
                    </>
                  )}
                  <DeleteIcon
                    onClick={() => {
                      setQuestionToDeleteId(id);
                      setIsDeleteQuestionModalOpen(true);
                    }}
                  />
                </div>
              </Question>
            )
          )}
          {!questions.length && <NoQuestionCard />}
        </div>
      </main>
    </Container>
  );
}
