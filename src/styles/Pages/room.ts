import styled from "styled-components";

export const Container = styled.div`
  header {
    padding: 1.5rem;
    border-bottom: 1px solid #e2e2e2;

    .switch {
      .react-switch-bg {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 0.5rem;
        height: 100%;

        svg {
          height: 100%;
          width: 1rem;
          color: yellow;
        }
      }

      &:not(.checked) {
        .react-switch-bg {
          > div {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 0.5rem;
          }
        }
      }
    }

    .content {
      max-width: 1128px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > img {
        max-width: 80px;
      }

      > div {
        display: flex;
        gap: 1rem;

        button {
          height: 2.5rem;
          background: transparent;
        }
      }
    }
  }

  main {
    max-width: 800px;
    margin: 0 auto;

    .room-title {
      margin: 2rem 0 1.5rem;
      display: flex;
      align-items: center;

      h1 {
        font-family: "Poppins", sans-serif;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.title};
      }

      span {
        margin-left: 1rem;
        background: #e559f9;
        border-radius: 9999px;
        padding: 0.5rem 1rem;
        color: #fff;
        font-weight: 500;
        font-size: 0.875rem;
      }
    }

    .question-list {
      margin-top: 2rem;
    }

    form {
      textarea {
        width: 100%;
        border: 0;
        padding: 1rem;
        border-radius: 0.5rem;
        background: ${({ theme }) => theme.component};
        box-shadow: 8px 2px 12px rgba(0, 0, 0, 0.04);
        resize: vertical;
        min-height: 130px;
        color: ${({ theme }) => theme.text};

        &:focus {
          outline: 2px solid #e559f9;
        }
      }

      .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;

        .user-info {
          display: flex;
          align-items: center;

          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }

          span {
            margin-left: 0.5rem;
            color: ${({ theme }) => theme.title};
            font-weight: 500;
            font-size: 0.875rem;
          }
        }

        > span {
          font-size: 0.875rem;
          color: #737388;
          font-weight: 500;

          button {
            background: transparent;
            border: 0;
            color: #835afd;
            text-decoration: underline;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
