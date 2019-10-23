import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { FlexRow } from "../../styles";
import ThemeContext from "../../context/theme-context";

let { string, number } = PropTypes;

const ScoreLabel = FlexRow.extend`
  justify-content: center;
  font-family: Roboto;
  font-weight: 600;
  color: ${props => props.color};
  font-size: 1.2em;

  ${props =>
    props.width === "md" &&
    css`
      font-size: 1em;
    `}
  ${props =>
    props.width === "sm" &&
    css`
      font-size: 0.9em;
    `}
   ${props =>
     props.width === "xs" &&
     css`
       font-size: 0.9em;
     `}
`;

const Label = styled.span`
  display: block;
  padding: 0.5em;
`;
const Score = styled.div`
  background: ${props => props.backgroundColor};
  padding: 1em;
  border-radius: 20px;
  color: ${props => props.color};
  height: 20px;
  line-height: 1.2;
`;

const ScoreDisplay = ({ name, score, percentage, width }) => {
  let position = percentage > 0 ? "above" : "below";

  return (
    <ThemeContext.Consumer>
      {theme => {
        let { tmWhite, tmGrey, tmLtPurple } = theme;

        return (
          <ScoreLabel width={width}>
            <Label color={tmGrey}>{`Your ${name} Score = `}</Label>
            <Score backgroundColor={tmLtPurple} color={tmWhite}>
              {score}
            </Score>
            <Label>
              {percentage === 0
                ? `is equal to average`
                : `${percentage}% ${position} average`}
            </Label>
          </ScoreLabel>
        );
      }}
    </ThemeContext.Consumer>
  );
};

ScoreDisplay.propTypes = {
  name: string,
  score: number,
  percentage: number
};

export default ScoreDisplay;
