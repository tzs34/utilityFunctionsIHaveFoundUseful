import styled, { keyframes } from "styled-components";

const FlexRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const FadeIn = styled.div`
  animation: ${fadeIn} 0.5s linear;
`;
const FadeOut = styled.div`
  animation: ${fadeOut} 0.5s linear;
`;

export { FlexRow, FadeIn, FadeOut };
