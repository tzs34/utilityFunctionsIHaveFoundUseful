import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import InfoSection from "../display/colored-header-section";
import { FlexRow, FadeIn } from "../../styles";
import Copy from "../../copy";
import ThemeContext from "../../context/theme-context";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

let { number } = PropTypes;

const {
  labels: { tcOTLabel, tcLGLabel, tcTCLabel, tcSRLabel }
} = Copy;

const helpConst = {
  [tcOTLabel]: [
    {
      header: tcOTLabel,
      paragraphs: [
        "Efficiency focus. Response driven L&D strategy rather than strategically planned. No consistent use of data"
      ],
      headerColor: "#FFFFFF",
      headerBackgroundColor: "#0071BC"
    }
  ],
  [tcLGLabel]: [
    {
      header: tcLGLabel,
      paragraphs: [
        "Outcomes focus. Driving and integrating learning and work but L&D decisions not always seen as a priority by leaders and managers. Using data to inform change"
      ],
      headerColor: "#FFFFFF",
      headerBackgroundColor: "#002E7D"
    }
  ],
  [tcTCLabel]: [
    {
      header: tcTCLabel,
      paragraphs: [
        "Technology focus. Increased business awareness but L&D decisions often made in isolation"
      ],
      headerColor: "#FFFFFF",
      headerBackgroundColor: "#00B0BA"
    }
  ],
  [tcSRLabel]: [
    {
      header: tcSRLabel,
      paragraphs: [
        "Shared focus on outcomes. Using analytics to inform and fine tune"
      ],
      headerColor: "#FFFFFF",
      headerBackgroundColor: "#DB1F6A"
    }
  ]
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const BackgroundContainer = FlexRow.extend`
  position: absolute;
  bottom: 1px;
  justify-content: start;
  ${props =>
    props.width === "xl" &&
    css`
      width: 95%;
    `}
  ${props =>
    props.width === "lg" &&
    css`
      width: 95%;
    `}
   ${props =>
     props.width === "md" &&
     css`
       width: 90%;
     `}
   ${props =>
     props.width === "sm" &&
     css`
       width: 90%;
     `}
    ${props =>
      props.width === "xs" &&
      css`
        width: 90%;
      `}
      ${props =>
        props.width === "pdf" &&
        css`
          width: 90%;
        `}
`;

const BackgroundDiv = styled.div`
  position: relative;
  background: ${props => props.color};
  color: ${props => props.color};
  width: ${props => (props.size / 10) * 100}%;
  height: ${props => props.height}px;
  margin-top: -${props => props.position}px;
`;
const Label = FlexRow.extend`
  justify-content: center;
  position: absolute;
  font-size: 1.2em;
  font-weight: 500;
  ${props =>
    props.width === "xl" &&
    css`
      bottom: -40px;
    `}
  ${props =>
    props.width === "lg" &&
    css`
      bottom: -40px;
    `}
   ${props =>
     props.width === "md" &&
     css`
       bottom: -50px;
     `}
   ${props =>
     props.width === "sm" &&
     css`
       bottom: -50px;
     `}
    ${props =>
      props.width === "xs" &&
      css`
        bottom: -50px;
      `}
      ${props =>
        props.width === "pdf" &&
        css`
          bottom: 15px;
        `}

  & span {
    padding: 0.5em;
    margin-top: 0.25em;
    font-size: 0.9em;
    ${props =>
      props.width === "xl" &&
      css`
        margin-left: 2px;
      `}
    ${props =>
      props.width === "lg" &&
      css`
        margin-left: 2px;
      `}
     ${props =>
       props.width === "md" &&
       css`
         margin-left: 15px;
       `}
     ${props =>
       props.width === "sm" &&
       css`
         margin-left: 15px;
       `}
      ${props =>
        props.width === "xs" &&
        css`
          margin-left: 15px;
        `}
        ${props =>
          props.width === "pdf" &&
          css`
            margin-left: 15px;
            font-size: 1.25em;
            color: white;
          `}
  }
  & svg{
    fill: ${props => props.iconColor}
    margin-top: -0.1em;
    ${props =>
      props.width === "lg" &&
      css`
        margin-left: 0px;
      `}
     ${props =>
       props.width === "md" &&
       css`
         margin-left: -20px;
       `}
     ${props =>
       props.width === "sm" &&
       css`
         margin-left: -20px;
       `}
      ${props =>
        props.width === "xs" &&
        css`
          margin-left: -20px;
        `}
        ${props =>
          props.width === "pdf" &&
          css`
            margin-left: -20px;
          `}
  }
`;
const Curve = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height}px;
  padding: 0.4em 1.4em;
  margin-bottom: 25px;
`;
const UserLabelContainer = FlexRow.extend`
  flex-direction: column;
`;
const UserNumber = styled.span`
  display: block;
  padding: 0.5em;
  font-size: 2em;
  text-align: center;
  color: ${props => props.color};
`;
const UserText = UserNumber.extend`
  font-size: 1em;
  ${props =>
    props.width === "pdf" &&
    css`
      font-size: 2em;
    `};
`;
const InfoContainer = styled.div`
  position: absolute;
  background: #ffffff;
  top: 60px;
  width: 320px;
  z-index: 20000;
  display: ${props => (props.showHelp ? "block" : "none")};
`;

class TransformationCurve extends Component {
  static UserLabel = ({ color, value }) => (
    <UserLabelContainer>
      <UserNumber left={50} color={color}>
        {Number(value).toFixed(2)}
      </UserNumber>
      <UserText left={50} color={color}>
        {"You are here"}
      </UserText>
    </UserLabelContainer>
  );

  static TextLabel = ({
    iconColor,
    size,
    classes,
    showHelp,
    text,
    toggleHelp,
    numbers,
    headerColor,
    headerBackgroundColor,
    width
  }) => {
    let helpText = helpConst[text];

    return (
      <Label
        size={size}
        iconColor={iconColor}
        width={width}
        onClick={() => {
          toggleHelp(text);
        }}
      >
        <span>{text}</span>
        <IconButton className={classes.button} aria-label="see more">
          <ExpandMoreIcon />
        </IconButton>
        <InfoContainer showHelp={showHelp}>
          <InfoSection text={helpText} arrowPosition="topCenter" />
        </InfoContainer>
      </Label>
    );
  };

  state = {
    showHelp: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.value !== nextProps.value || this.state !== nextState;
  }

  toggleHelp = id => {
    let showHelp = id === this.state.showHelp ? null : id;
    this.setState({ showHelp });
  };

  render() {
    let { height, value, classes, width, pdfSize = null } = this.props;
    let { toggleHelp } = this;
    let { showHelp } = this.state;
    width = pdfSize != null ? pdfSize : width;

    return (
      <ThemeContext.Consumer>
        {context => (
          <Curve height={height}>
            <FadeIn>
              {value && (
                <div>
                  <BackgroundContainer width={width}>
                    <BackgroundDiv
                      className="info-section"
                      size={2.5}
                      color={context.tmBlue}
                      height={value <= 37 ? 200 : 100}
                      position={value <= 37 ? 100 : 0}
                    >
                      <TransformationCurve.UserLabel
                        color={value <= 37 ? context.tmWhite : "transparent"}
                        value={value}
                      />

                      <TransformationCurve.TextLabel
                        text={tcOTLabel}
                        classes={classes}
                        size={2.0}
                        iconColor={context.tmLtBlue}
                        numbers={[
                          { left: 0, value: 0 },
                          { left: 95, value: 37 }
                        ]}
                        toggleHelp={toggleHelp}
                        showHelp={showHelp === tcOTLabel}
                        width={width}
                      />
                    </BackgroundDiv>
                    <BackgroundDiv
                      size={2.5}
                      color={context.tmLtBlue}
                      height={value <= 50 && value > 37 ? 200 : 100}
                      position={value <= 50 && value > 37 ? 100 : 0}
                    >
                      <TransformationCurve.UserLabel
                        color={
                          value <= 50 && value > 37
                            ? context.tmWhite
                            : "transparent"
                        }
                        value={value}
                      />
                      <TransformationCurve.TextLabel
                        text={tcTCLabel}
                        classes={classes}
                        size={2.0}
                        iconColor={context.tmDkBlue}
                        numbers={[{ left: 95, value: 50 }]}
                        toggleHelp={toggleHelp}
                        showHelp={showHelp === tcTCLabel}
                        width={width}
                      />
                    </BackgroundDiv>
                    <BackgroundDiv
                      size={2.5}
                      color={context.tmDkBlue}
                      height={value <= 73 && value > 50 ? 200 : 100}
                      position={value <= 73 && value > 50 ? 100 : 0}
                    >
                      <TransformationCurve.UserLabel
                        color={
                          value <= 73 && value > 50
                            ? context.tmWhite
                            : "transparent"
                        }
                        value={value}
                      />
                      <TransformationCurve.TextLabel
                        text={tcLGLabel}
                        classes={classes}
                        size={3.5}
                        iconColor={context.tmDkBlue}
                        numbers={[{ left: 95, value: 73 }]}
                        toggleHelp={toggleHelp}
                        showHelp={showHelp === tcLGLabel}
                        width={width}
                      />
                    </BackgroundDiv>
                    <BackgroundDiv
                      size={2.5}
                      color={context.tmPink}
                      height={value > 74 ? 200 : 100}
                      position={value > 74 ? 100 : 0}
                    >
                      <TransformationCurve.UserLabel
                        color={value > 74 ? context.tmWhite : "transparent"}
                        value={value}
                      />
                      <TransformationCurve.TextLabel
                        text={tcSRLabel}
                        classes={classes}
                        size={3}
                        iconColor={context.tmPink}
                        numbers={[{ left: 91, value: 100 }]}
                        toggleHelp={toggleHelp}
                        showHelp={showHelp === tcSRLabel}
                        width={width}
                      />
                    </BackgroundDiv>
                  </BackgroundContainer>
                </div>
              )}
            </FadeIn>
          </Curve>
        )}
      </ThemeContext.Consumer>
    );
  }
}

TransformationCurve.propTypes = {
  value: number.isRequired,
  height: number.isRequired
};

export default withStyles(styles)(withWidth()(TransformationCurve));
