import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 3rem;

  svg {
    height: 3rem;
    width: 3rem;
  }

  svg path {
    stroke: #ea4335;
  }

  h1 {
    font-family: "Poppins", sans-serif;
    color: ${({ theme }) => theme.title};
    font-weight: bold;
    font-size: 1.5rem;
    margin: 1rem 0 0.75rem;
  }

  p {
    color: #737380;
    font-weight: 1rem;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 2.5rem;

    button {
      color: #737380;
      background: #dbdcdd;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      border: 0;
      cursor: pointer;
      transition: filter 0.2s;
      font-weight: bold;

      &:hover {
        filter: brightness(0.9);
      }

      &.red {
        background: #ea4335;
        color: #fefefe;
      }
    }
  }
`;
