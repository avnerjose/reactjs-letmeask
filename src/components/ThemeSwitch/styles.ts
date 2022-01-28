import styled from "styled-components";
import Switch from "react-switch";

export const Container = styled(Switch)`
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
`;
