import styled from "styled-components";

export const Container = styled.button`
  height: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;
  color: ${({ theme }) => theme.title};

  background: transparent;
  border: 1px solid #835afd;
  cursor: pointer;

  display: flex;

  div {
    background: #835afd;
    padding: 0 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 1rem 0 0.75rem;
    width: 100%;
    font-size: 0.875rem;
    font-weight: 500;
  }
`;
