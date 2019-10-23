import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import ThemeContext from "../../context/theme-context";
import { FlexRow, ArrowUp, ArrowDown } from "../../styles";
import { uppercaseSplit, addTwoDPZero } from "../../utils";
import Lock from "@material-ui/icons/Lock";
import Copy from "../../copy";

let { object } = PropTypes;

let {
  labels: { contactUsLabel, industryLabel }
} = Copy;

const Table = FlexRow.extend`
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  ${props =>
    props.width === "sm" &&
    css`
      margin-left: -20px;
    `} ${props =>
    props.width === "xs" &&
    css`
      margin-left: -20px;
    `};
`;

const LabelColumn = FlexRow.extend`
  position: relative;
  justify-content: flex-end;
  align-content: flex-end;
  flex-direction: column;
  background: ${props => props.backgroundColor};
  color: ${props => props.color};
  font-size: 1em;
  border-style: solid;
  border-width: 4px;
  border-color: ${props => props.borderColor};
  text-align: right;
  font-weight: 500;

  ${props =>
    props.width === "sm" &&
    css`
      width: 20px;
      font-size: 0.8em;
    `} ${props =>
    props.width === "xs" &&
    css`
      width: 200px;
      font-size: 0.8em;
    `};
`;

const TableColumn = LabelColumn.extend`
  font-weight: 700;
  ${props =>
    props.width === "lg" &&
    css`
      width: 200px;
      font-size: 1em;
    `}
   ${props =>
     props.width === "md" &&
     css`
       width: 150px;
       font-size: 0.8em;
     `}
   ${props =>
     props.width === "sm" &&
     css`
       width: 150px;
       font-size: 0.8em;
     `}
    ${props =>
      props.width === "xs" &&
      css`
        width: 150px;
        font-size: 0.8em;
      `}
`;
const HighLightRow = FlexRow.extend`
  width: 25%;
  div:nth-child(2) {
    margin-top: -0.5em;
  }
`;
const UsrColumn = TableColumn.extend`
  background:${props => props.backgroundColor}
  color: ${props => props.color};
`;
const Label = styled.span`
  display: block;
  width: 200px;
  text-align: center;
  padding: 1em;
`;
const AreaLabel = Label.extend`
  text-align: left;
  width: 300px;
`;
const Spacer = Label.extend`
  color: ${props => props.color};
`;
const LockContainer = styled.div`
  padding: 0.4em;
  margin-right: 50%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  background: #00b0ba;

  &:hover {
    opacity: 0.85;

    & span {
      position: relative;
      color: #ffffff;
      font-size: 0.85em;
      font-weight: 800;
      width: 250px;
      top: 45%;
      ${props =>
        props.width === "lg" &&
        css`
          right: 15%;
        `}
       ${props =>
         props.width === "md" &&
         css`
           font-size: 0.75em;
           right: 10%;
         `}
       ${props =>
         props.width === "sm" &&
         css`
           right: 5%;
         `}
        ${props =>
          props.width === "xs" &&
          css`
            right: 4%;
          `}
    }
  }
`;

const ContactUs = styled.span`
  display: block;
  position: relative;
  top: 30%;
  left: 8%;
  text-align: left;
`;

const ResourceTable = ({ data, width }) => {
  let year = new Date().getFullYear();
  return (
    <ThemeContext.Consumer>
      {theme => {
        let {
          tmWhite,
          tmLtGrey,
          tmGrey,
          tmGoGreen,
          tmMidRed,
          tmLtPurple
        } = theme;

        return (
          <Table width={width}>
            <LabelColumn
              backgroundColor={tmLtGrey}
              color={tmGrey}
              borderColor={tmWhite}
            >
              <Spacer color={tmLtGrey}>{"Area"}</Spacer>
              {data.map(({ label }) => {
                return (
                  <AreaLabel key={label}>{uppercaseSplit(label)}</AreaLabel>
                );
              })}
            </LabelColumn>
            <UsrColumn
              backgroundColor={tmLtPurple}
              color={tmWhite}
              width={width}
            >
              <Label>{"You"}</Label>
              {data.map(({ userValue, surveyValue }, index) => {
                let above = userValue > surveyValue;
                return (
                  <HighLightRow>
                    <Label key={`${userValue}${index}`}>{userValue}</Label>
                    {above ? (
                      <ArrowUp color={tmGoGreen} width={10} />
                    ) : (
                      <ArrowDown color={tmMidRed} width={10} />
                    )}
                  </HighLightRow>
                );
              })}
            </UsrColumn>
            <TableColumn
              backgroundColor={tmLtGrey}
              color={tmGrey}
              borderColor={tmWhite}
              width={width}
            >
              <Label>{`Average ${year}`}</Label>
              {data.map(({ surveyValue }, index) => {
                return (
                  <Label key={`${surveyValue}${index}`}>{surveyValue}</Label>
                );
              })}
            </TableColumn>
            <TableColumn
              backgroundColor={tmLtGrey}
              color={tmGrey}
              borderColor={tmWhite}
              width={width}
            >
              <Overlay width={width}>
                <ContactUs>{contactUsLabel}</ContactUs>
              </Overlay>
              <Label>{industryLabel}</Label>
              <div>
                {data.map(({ sindValue }, index) => {
                  return (
                    <LockContainer key={`${sindValue}${index}`}>
                      <Lock style={{ color: tmGrey }} />
                    </LockContainer>
                  );
                })}
              </div>
            </TableColumn>
          </Table>
        );
      }}
    </ThemeContext.Consumer>
  );
};

ResourceTable.propTypes = {
  data: object.isRequired
};
export default ResourceTable;
