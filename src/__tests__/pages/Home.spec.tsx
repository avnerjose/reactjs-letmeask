/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useNavigate } from "react-router-dom";
import { get } from "firebase/database";

import { useAuth } from "../../contexts/AuthContext";
import { Home } from "../../pages/Home";
import { act } from "react-dom/test-utils";

jest.mock("../../services/firebase.ts", () => {
  return {
    database: null,
  };
});
jest.mock("react-router-dom");
jest.mock("../../contexts/AuthContext");
jest.mock("firebase/database");
window.alert = jest.fn();

describe("Home Page", () => {
  it("renders correctly", () => {
    const useAuthMocked = mocked(useAuth);
    useAuthMocked.mockReturnValue({
      user: null,
    } as any);

    render(<Home />);

    expect(screen.getByText("Crie sua sala com o Google")).toBeInTheDocument();
  });

  it("should call signInWithGoogle when user is not signed in", async () => {
    const useAuthMocked = mocked(useAuth);
    const useNavigateMocked = mocked(useNavigate);
    const navigateMocked = jest.fn();
    const signInWithGoogleMocked = jest.fn();

    useAuthMocked.mockReturnValue({
      user: null,
      signInWithGoogle: signInWithGoogleMocked,
    });
    useNavigateMocked.mockReturnValue(navigateMocked);

    render(<Home />);

    const createRoomButton = screen.getByText("Crie sua sala com o Google");

    fireEvent.click(createRoomButton);

    expect(signInWithGoogleMocked).toHaveBeenCalled();

    await waitFor(() => {
      return expect(navigateMocked).toHaveBeenCalledWith("/rooms/new");
    });
  });

  it("should not call signInWithGoogle when user is signed in", () => {
    const useAuthMocked = mocked(useAuth);
    const signInWithGoogleMocked = jest.fn();

    useAuthMocked.mockReturnValue({
      user: {
        id: "mock-id",
        avatar: "mock-avatar",
        name: "mock-name",
      },
      signInWithGoogle: signInWithGoogleMocked,
    });

    render(<Home />);

    const createRoomButton = screen.getByText("Crie sua sala com o Google");

    fireEvent.click(createRoomButton);

    expect(signInWithGoogleMocked).not.toHaveBeenCalled();
  });

  it("should not navigate if room code is empty", () => {
    const useNavigateMocked = mocked(useNavigate);
    const navigateMocked = jest.fn();
    useNavigateMocked.mockReturnValue(navigateMocked);

    render(<Home />);

    const roomForm = screen.getByRole("form");

    fireEvent.submit(roomForm);

    expect(navigateMocked).not.toHaveBeenCalled();
  });

  it("should not be able to enter on a non existing room", async () => {
    const firebaseGetMocked = mocked(get);
    const useNavigateMocked = mocked(useNavigate);
    const navigateMocked = jest.fn();

    useNavigateMocked.mockReturnValue(navigateMocked);
    firebaseGetMocked.mockResolvedValueOnce({
      exists: () => false,
    } as any);
    render(<Home />);

    const roomInput = screen.getByPlaceholderText("Digite o código da sala");

    fireEvent.change(roomInput, {
      target: { value: "mock" },
    });
    
    await act(async () => {
      const roomForm = screen.getByRole("form");

      fireEvent.submit(roomForm);
    });

    expect(navigateMocked).not.toHaveBeenCalled();
  });

  it("should not be able to enter on a room that already ended", async () => {
    const firebaseGetMocked = mocked(get);
    const useNavigateMocked = mocked(useNavigate);
    const navigateMocked = jest.fn();

    useNavigateMocked.mockReturnValue(navigateMocked);
    firebaseGetMocked.mockResolvedValueOnce({
      exists: () => true,
      val: () => {
        return {
          endedAt: new Date(),
        };
      },
    } as any);

    render(<Home />);

    const roomInput = screen.getByPlaceholderText("Digite o código da sala");

    fireEvent.change(roomInput, {
      target: { value: "mock" },
    });

    await act(async () => {
      const roomForm = screen.getByRole("form");

      fireEvent.submit(roomForm);
    });

    expect(navigateMocked).not.toHaveBeenCalled();
  });

  it("should be able to enter on a room that exists", async () => {
    const firebaseGetMocked = mocked(get);
    const useNavigateMocked = mocked(useNavigate);
    const navigateMocked = jest.fn();

    useNavigateMocked.mockReturnValue(navigateMocked);
    firebaseGetMocked.mockResolvedValueOnce({
      exists: () => true,
      val: () => {
        return {
          endedAt: null,
        };
      },
    } as any);

    render(<Home />);

    const roomForm = screen.getByRole("form");
    const roomInput = screen.getByPlaceholderText(
      "Digite o código da sala"
    ) as HTMLInputElement;

    fireEvent.change(roomInput, {
      target: { value: "mock" },
    });

    fireEvent.submit(roomForm);

    await waitFor(() => {
      return expect(navigateMocked).toHaveBeenCalledWith("rooms/mock");
    });
  });
});
