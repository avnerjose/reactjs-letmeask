import { Link } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import styles from "../styles/Pages/auth.module.scss";
import { Button } from "../components/Button";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { push, ref, set } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function NewRoom() {
  const [newRoom, setNewRoom] = useState("");
  const navigate = useNavigate();

  const { user } = useAuth();

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === "") return;

    const roomRef = ref(database, "rooms");

    const newRoomRef = await push(roomRef);

    set(newRoomRef, {
      title: newRoom,
      authorId: user?.id,
    });

    setNewRoom("");

    navigate(`/admin/rooms/${newRoomRef.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
