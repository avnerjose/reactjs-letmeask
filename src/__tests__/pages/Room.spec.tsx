/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";
import { act } from "react-dom/test-utils";
import { useAuth } from "../../contexts/AuthContext";
import { useRoom } from "../../hooks/useRoom";
import { Room } from "../../pages/Room";

type Question = {
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

const mockedQuestions: Question[] = [
  {
    id: "1",
    author: {
      name: "mocked-author",
      avatar: "mocked-avatar",
    },
    content: "mocked-content",
    isAnswered: false,
    isHighlighted: false,
    likeCount: 1,
    likeId: null,
  },
];

const mockedPush = jest.fn();
const mockedRef = jest.fn();
const mockedRemove = jest.fn();
const mockedSet = jest.fn();

jest.mock("../../services/firebase.ts", () => {
  return {
    database: null,
  };
});

jest.mock("../../contexts/ThemeContext.tsx", () => {
  return {
    useThemeContext: () => {
      return {
        theme: "light",
        toggleTheme: jest.fn(),
      };
    },
  };
});

jest.mock("firebase/database", () => {
  return {
    push: mockedPush,
    ref: mockedRef,
    remove: mockedRemove,
    set: mockedSet,
  };
});

jest.mock("../../hooks/useRoom.tsx");

jest.mock("../../contexts/AuthContext.tsx");

const useAuthMockedEmpty = () => {
  const useAuthMocked = mocked(useAuth);

  useAuthMocked.mockReturnValue({
    user: null,
    signInWithGoogle: jest.fn(),
  });

  return useAuthMocked;
};

describe("Room page", () => {
  it("should render correctly", () => {
    const mockedUseRoom = mocked(useRoom);
    useAuthMockedEmpty();
    mockedUseRoom.mockReturnValue({
      title: "mock-title",
      questions: [],
    });

    render(<Room />);

    expect(screen.getByText("Enviar pergunta")).toBeInTheDocument();
    expect(screen.getByText("Sala mock-title")).toBeInTheDocument();
  });

  it("should render no question card when questions list is empty", () => {
    const mockedUseRoom = mocked(useRoom);
    mockedUseRoom.mockReturnValue({
      title: "mock-title",
      questions: [],
    });

    render(<Room />);

    expect(screen.queryByLabelText("Like button")).not.toBeInTheDocument();
    expect(screen.getByText(/Nenhuma pergunta por aqui/)).toBeInTheDocument();
  });

  it("should render questions when questions list is not empty", () => {
    const mockedUseRoom = mocked(useRoom);
    mockedUseRoom.mockReturnValue({
      title: "mock-title",
      questions: mockedQuestions,
    });

    render(<Room />);

    expect(screen.getByText("mocked-author")).toBeInTheDocument();
    expect(screen.getByLabelText("Like button")).toBeInTheDocument();
  });

  it("should not show like button when question is answered", () => {
    const mockedUseRoom = mocked(useRoom);
    const newMockedQuestions = mockedQuestions.map((question) => {
      return {
        ...question,
        isAnswered: true,
      };
    }) as Question[];
    mockedUseRoom.mockReturnValue({
      title: "mock-title",
      questions: newMockedQuestions,
    });

    render(<Room />);

    expect(screen.queryByLabelText("Like button")).not.toBeInTheDocument();
  });

  it("should show user info if user is available", () => {
    const useAuthMocked = mocked(useAuth);

    useAuthMocked.mockReturnValue({
      user: {
        id: "mock-id",
        avatar: "mock-avatar",
        name: "mock-user",
      },
      signInWithGoogle: jest.fn(),
    });

    render(<Room />);

    expect(screen.getByText("mock-user")).toBeInTheDocument();
    expect(
      screen.queryByText(/Para enviar uma pergunta,/)
    ).not.toBeInTheDocument();
  });

  it("should show login text if user is not available", () => {
    useAuthMockedEmpty();

    render(<Room />);

    expect(screen.getByText(/Para enviar uma pergunta,/)).toBeInTheDocument();
  });

  it("should not be able to send empty question", () => {
    render(<Room />);
    const roomForm = screen.getByRole("form");

    fireEvent.submit(roomForm);

    expect(mockedSet).not.toHaveBeenCalled();
    expect(mockedPush).not.toHaveBeenCalled();
    expect(mockedRef).not.toHaveBeenCalled();
  });

  it("should not be able to send message when not logged in", () => {
    render(<Room />);

    const roomTextArea = screen.getByPlaceholderText(
      "o que você quer perguntar?"
    ) as HTMLTextAreaElement;
    const roomForm = screen.getByRole("form");

    fireEvent.change(roomTextArea, { target: { value: "mocked-question" } });

    fireEvent.submit(roomForm);

    expect(mockedSet).not.toHaveBeenCalled();
    expect(mockedPush).not.toHaveBeenCalled();
    expect(mockedRef).not.toHaveBeenCalled();
  });

  it("should be able to send message when question is not empty and is logged in", async () => {
    const useAuthMocked = mocked(useAuth);
    useAuthMocked.mockReturnValue({
      user: {
        id: "mock-id",
        avatar: "mock-avatar",
        name: "mock-user",
      },
      signInWithGoogle: jest.fn(),
    });

    render(<Room />);

    const roomTextArea = screen.getByPlaceholderText(
      "o que você quer perguntar?"
    ) as HTMLTextAreaElement;
    const roomForm = screen.getByRole("form");

    fireEvent.change(roomTextArea, { target: { value: "mocked-question" } });

    fireEvent.submit(roomForm);

    await waitFor(() => {
      return expect(mockedSet).toHaveBeenCalled();
    });
  });
});
