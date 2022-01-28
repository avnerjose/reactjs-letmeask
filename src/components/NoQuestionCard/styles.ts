import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 3rem;

  h2 {
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-size: 1.125rem;
    color: ${({ theme }) => theme.title};
    margin: 1rem 0 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: #737380;
    max-width: 280px;
    text-align: center;
  }
`;
