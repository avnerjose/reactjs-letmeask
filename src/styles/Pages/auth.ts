import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  aside {
    flex: 7;
    background: #835afd;
    color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 120px 80px;

    img {
      max-width: 320px;
    }

    strong {
      font: 700 2.25rem "Poppins", sans-serif;
      line-height: 2.625rem;
      margin-top: 1rem;
    }

    p {
      font-size: 1.5rem;
      line-height: 2rem;
      margin-top: 1rem;
      color: #f8f8f8;
    }
  }

  main {
    flex: 8;

    padding: 0 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  align-items: stretch;
  text-align: center;

  > img {
    align-self: center;
  }

  h2 {
    font-size: 1.5rem;
    margin: 2rem 0 1.5rem;
    font-family: "Poppins", sans-serif;
    color: ${({ theme }) => theme.title};
  }

  form {
    input {
      height: 3.125rem;
      border-radius: 0.5rem;
      padding: 0 1rem;
      background: ${({ theme }) => theme.component};
      border: 1px solid #a8a8b3;
      color: ${({ theme }) => theme.text};
    }

    button {
      margin-top: 1rem;
    }

    button,
    input {
      width: 100%;
    }
  }

  p {
    font-size: 14px;
    color: #737380;
    margin-top: 1rem;
    a {
      color: #e559f9;
    }
  }

  .create-room {
    margin-top: 4rem;
    height: 50px;
    border-radius: 0.5rem;
    font-weight: 500;
    background: #ea4335;
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

    &:hover {
      filter: brightness(0.9);
    }
  }

  .separator {
    font-size: 0.875rem;
    color: #a8a8b3;

    margin: 2rem 0;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      flex: 1;
      height: 1px;
      margin: 1px;
      background: #a8a8b3;
      margin-right: 1rem;
    }

    &::after {
      content: "";
      flex: 1;
      height: 1px;
      margin: 1px;
      background: #a8a8b3;
      margin-left: 1rem;
    }
  }
`;
