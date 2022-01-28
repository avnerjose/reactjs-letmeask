import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: #29292e;
  }

  body,
  input,
  button,
  textarea {
    font: 400 1rem "Roboto", sans-serif;
  }


.react-modal-overlay {
  background: rgba(255, 255, 255, 0.5);

  position: fixed;
  inset: 0 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.react-modal-content {
  width: 100%;
  max-width: 576px;
  background: ${({ theme }) => theme.component};

  position: relative;
  margin: auto;
  border-radius: 0.5rem;
  box-shadow: 8px 12px 12px rgba(0, 0, 0, 0.05);
}

.react-modal-close {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  border: 0;
  background: transparent;
  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(0.8);
  }
}


`;
