import styled from "styled-components";

export const Container = styled.button`
  height: 50px;
  border-radius: 0.5rem;
  font-weight: 500;
  background: #835afd;
  padding: 0 2rem;
  color: #fff;
  border: 0;
  transition: filter 0.2s;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-right: 0.5rem;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.outlined {
    background: #fff;
    border: 1px solid #835afd;
    color: #835afd;
  }
`;
