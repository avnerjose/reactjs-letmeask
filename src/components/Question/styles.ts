import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.component};
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.04);
  padding: 1.5rem;

  & + & {
    margin-top: 0.5rem;
  }

  &.highlighted {
    background: ${({ theme }) => theme.highlighted};
    border: 1px solid #835afd;

    footer .user-info span {
      color: ${({ theme }) => theme.text};
    }
  }

  &.answered {
    background: ${({ theme }) => theme.answered};

    svg {
      filter: brightness(1.3);
    }

    footer {
      .user-info {
        span {
          filter: brightness(1.3);
        }
      }
    }
  }

  p {
    color: ${({ theme }) => theme.text};
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

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
        color: #737380;
        font-size: 0.875rem;
      }
    }

    .buttons {
      display: flex;
      gap: 0.5rem;
      color: #737380;

      svg {
        cursor: pointer;

        &.active {
          color: #835afd;

          circle {
            stroke: #835afd;
          }

          path {
            stroke: #835afd;
          }
        }
      }
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 0.5rem;

        &.liked {
          color: #835afd;

          svg path {
            stroke: #835afd;
          }
        }
      }

      &:hover {
        filter: brightness(0.6);
      }
    }
  }
`;
