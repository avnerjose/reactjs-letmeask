import React from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import darkLogoImg from "../assets/images/darklogo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import { Container, MainContent } from "../styles/Pages/auth";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { get, ref } from "firebase/database";
import { useThemeContext } from "../contexts/ThemeContext";

export function Home() {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    try {
      if (!user) {
        await signInWithGoogle();
      }
      navigate("/rooms/new");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === "") return;

    const roomRef = ref(database, `rooms/${roomCode}`);

    const firebaseRoom = await get(roomRef);

    if (!firebaseRoom.exists()) {
      alert("Room does not exists.");
      setRoomCode("");
      return;
    }

    if (firebaseRoom.val().endedAt) {
      alert("Room already closed");
      setRoomCode("");
      return;
    }

    navigate(`rooms/${roomCode}`);
  }

  return (
    <Container>
      <aside>
        <img src={illustrationImg} alt="letmeask" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <MainContent>
          <img src={theme === "light" ? logoImg : darkLogoImg} alt="LetMeAsk" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIcon} alt="Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom} aria-label="form">
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </MainContent>
      </main>
    </Container>
  );
}
