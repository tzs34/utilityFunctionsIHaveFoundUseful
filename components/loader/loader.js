import React from "react";
import styled, { keyframes } from "styled-components";
import ThemeContext from "../../context/theme-context";

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const SquareContainer = styled.div`
 width: ${props => props.loaderWidth}px;
 height: ${props => props.loaderHeight}px;
 background-color: transparent;
 display: flex;
 align-items: center;
 justify-content: center;
 margin; 0 auto;
`;

const Square = styled.div`
  height: ${props => props.squareSize}em;
  width: ${props => props.squareSize}em;
  padding: 0.5em;
  margin: auto;
  display: inline-block;
`;

const SquareOne = Square.extend`
    background:${props => props.color}
    animation: ${pulse} 2s linear infinite;
    animation-delay: .50s;
`;

const SquareTwo = Square.extend`
  background:${props => props.color}
  animation: ${pulse} 2s linear infinite;
  animation-delay: 1s;
`;

const SquareThree = Square.extend`
  background:${props => props.color}
  animation: ${pulse} 2s linear infinite;
  animation-delay 1.5s;
`;

const SquareFour = Square.extend`
  background:${props => props.color}
  animation: ${pulse} 2s linear infinite;
  animation-delay: 2s;
`;

const Loader = ({
  direction = "row",
  loaderWidth = 200,
  loaderHeight = 50,
  squareSize = 2.5
}) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        let { tmDkBlue, tmBlue, tmLtBlue, tmPink } = theme;
        return (
          <SquareContainer
            loaderWidth={loaderWidth}
            loaderHeight={loaderHeight}
          >
            <SquareOne squareSize={squareSize} color={tmBlue} />
            <SquareTwo squareSize={squareSize} color={tmLtBlue} />
            <SquareThree squareSize={squareSize} color={tmDkBlue} />
            <SquareFour squareSize={squareSize} color={tmPink} />
          </SquareContainer>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Loader;
