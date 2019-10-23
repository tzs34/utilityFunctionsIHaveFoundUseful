import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import InformationHeader from "../display/information-header";
import { FlexRow, HDivider } from "../../styles";
import Info from "@material-ui/icons/Info";
import withWidth from "@material-ui/core/withWidth";
import ThemeContext from "../../context/theme-context";
import Copy from "../../copy";

let { number, string } = PropTypes;

const {
  titles: { goalTitle, barrierTitle },
  descriptions: { barrierDesc, benefitDesc }
} = Copy;

const AEDivider = HDivider.extend`
  background: #e0e0e0;
  width: 90%;
  opacity: 0.4;
`;
const ActualExpected = styled.div`
  padding: 0.2em;
  border: 1px solid #e0e0e0;
  width: 80%;
  margin: 0 auto;
`;
const ActualExpectedConatiner = FlexRow.extend`
  align-items: center;
  justify-content: space-around;
  padding: 1em;
  width: 100%;
  ${props =>
    props.width === "xl" &&
    css`
      flex-direction: row;
    `}
  ${props =>
    props.width === "lg" &&
    css`
      flex-direction: row;
    `}
   ${props =>
     props.width === "md" &&
     css`
       flex-direction: column;
     `}
   ${props =>
     props.width === "sm" &&
     css`
       flex-direction: column;
     `}
    ${props =>
      props.width === "xs" &&
      css`
        flex-direction: column;
      `}
`;
const LabelRow = FlexRow.extend`
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: space-between;
  padding: 0.8em;
  font-size: 1.2em;
  font-weight: 400;
  font-family: Roboto, sans serif;
  margin-left: 25%;
  & span {
    font-weight: 600;
    font-size: 1.3em;
    color: ${props => props.color};
  }
`;

const ActualExpectedComponent = props => {
  let {
    expectedBenefits,
    actualBenefits,
    expectedBarriers,
    actualBarriers,
    width
  } = props;
  return (
    <ThemeContext.Consumer>
      {theme => {
        let { tmLabelGrey, tmPurple } = theme;
        return (
          <ActualExpectedConatiner width={width}>
            <div>
              <InformationHeader
                id={"aebenefits"}
                title={goalTitle}
                information={benefitDesc}
                arrowPosition={"center"}
                position={"left"}
                icon={Info}
                width={"12%"}
                textColor={"grey"}
                uppercase={false}
              />

              <ActualExpected>
                {expectedBenefits && (
                  <LabelRow color={tmLabelGrey}>
                    <label>Expected Benefits</label>
                    <span>{expectedBenefits}</span>
                  </LabelRow>
                )}
                <AEDivider />

                {actualBenefits && (
                  <LabelRow color={tmPurple}>
                    <label>Actual Benefits</label>
                    <span>{actualBenefits}</span>
                  </LabelRow>
                )}
              </ActualExpected>
            </div>
            <div>
              <InformationHeader
                id={"aebarriers"}
                title={barrierTitle}
                information={barrierDesc}
                arrowPosition={"center"}
                position={"left"}
                icon={Info}
                width={"12%"}
                textColor={"grey"}
                uppercase={false}
              />
              <ActualExpected>
                {expectedBarriers && (
                  <LabelRow color={tmLabelGrey}>
                    <label>Expected Barriers</label>
                    <span>{expectedBarriers}</span>
                  </LabelRow>
                )}
                <AEDivider />
                {actualBarriers && (
                  <LabelRow color={tmPurple}>
                    <label>Actual Barriers</label>
                    <span>{actualBarriers}</span>
                  </LabelRow>
                )}
              </ActualExpected>
            </div>
          </ActualExpectedConatiner>
        );
      }}
    </ThemeContext.Consumer>
  );
};

ActualExpectedComponent.propTypes = {
  expectedBenefits: number.isRequired,
  expectedBarriers: number.isRequired,
  actualBenefits: number.isRequired,
  actualBarriers: number.isRequired,
  width: string.isRequired
};

export default withWidth()(ActualExpectedComponent);
