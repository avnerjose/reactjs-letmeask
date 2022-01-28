import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | null;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`);

    const unsubscribeRoomListener = onValue(roomRef, (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            ...value,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId:
              Object.entries(value.likes ?? {}).find(
                ([key, like]) => like.authorId === user?.id
              )?.[0] || null,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      unsubscribeRoomListener();
    };
  }, [roomId, user?.id]);

  return { questions, title };
}
