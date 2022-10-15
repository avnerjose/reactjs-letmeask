import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { NewRoom } from "../../pages/NewRoom";

const mockedNavigate = jest.fn();

jest.mock("../../services/firebase.ts", () => {
  return {
    database: null,
  };
});

jest.mock("../../contexts/AuthContext", () => {
  return {
    useAuth: () => {
      return {
        user: {
          id: "mock-id",
          avatar: "mock-avatar",
          name: "mock-name",
        },
      };
    },
  };
});

jest.mock("react-router-dom", () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
    useNavigate: () => mockedNavigate,
  };
});

jest.mock("firebase/database", () => {
  return {
    ref: jest.fn(),
    push: () => {
      return {
        key: "mock-key",
      };
    },
    set: jest.fn(),
  };
});

describe("NewRoom page", () => {
  it("should render correctly", () => {
    render(<NewRoom />);

    expect(
      screen.getByText(/Quer entrar em uma sala existente/)
    ).toBeInTheDocument();
  });

  it("should not create room with empty name", () => {
    render(<NewRoom />);

    const newRoomForm = screen.getByRole("form");

    fireEvent.submit(newRoomForm);

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("should create room when name is filled", async () => {
    render(<NewRoom />);

    const newRoomInput = screen.getByPlaceholderText("Nome da sala");
    const newRoomForm = screen.getByRole("form");

    fireEvent.change(newRoomInput, { target: { value: "mock-value" } });
    fireEvent.submit(newRoomForm);

    await waitFor(() => {
      return expect(mockedNavigate).toHaveBeenCalledWith(
        "/admin/rooms/mock-key"
      );
    });
  });
});
