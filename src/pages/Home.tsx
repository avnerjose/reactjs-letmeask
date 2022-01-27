import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import styles from "../styles/Pages/auth.module.scss";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { get, ref } from "firebase/database";

export function Home() {
  const navigate = useNavigate();
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
    <div className={styles["page-auth"]}>
      <aside>
        <img src={illustrationImg} alt="letmeask" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className={styles["main-content"]}>
          <img src={logoImg} alt="LetMeAsk" />
          <button className={styles["create-room"]} onClick={handleCreateRoom}>
            <img src={googleIcon} alt="Google" />
            Crie sua sala com o Google
          </button>
          <div className={styles["separator"]}>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
