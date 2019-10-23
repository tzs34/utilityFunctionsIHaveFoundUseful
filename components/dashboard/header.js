import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Progress from "../display/progress";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import { HeaderLabel, FlexRow, FadeIn } from "../../styles";
import { removeInvalidChars } from "../../utils";
import { withStyles } from "@material-ui/core/styles";
import Loader from "../loader/loader";
import Button from "@material-ui/core/Button";
import FileDownload from "@material-ui/icons/FileDownload";
import withWidth from "@material-ui/core/withWidth";
import Copy from "../../copy";

let { array, bool, string, number, object } = PropTypes;
let {
  labels: { downloadLabel }
} = Copy;

const Label = HeaderLabel.extend`
${props =>
  props.width === "lg" &&
  css`
    font-size: 1.1em;
  `}
 ${props =>
   props.width === "md" &&
   css`
     font-size: 1.1em;
   `}
 ${props =>
   props.width === "sm" &&
   css`
     font-size: 0.95em;
   `}
  ${props =>
    props.width === "xs" &&
    css`
      font-size: 0.9em;
    `}
`;
const SwitchContainer = FlexRow.extend`
  justify-content: flex-start;
  margin-left: 1em;

  ${props =>
    props.width === "lg" &&
    css`
      width: 600px;
    `}
   ${props =>
     props.width === "md" &&
     css`
       width: 300px;
     `}
   ${props =>
     props.width === "sm" &&
     css`
       width: 250px;
     `}
    ${props =>
      props.width === "xs" &&
      css`
        width: 300px;
      `}
  & span{
    ${props =>
      props.width === "lg" &&
      css`
        font-size: 1em;
      `}
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
  }
`;
const ProgressConatiner = styled.div`
  margin-top: -20px;
   ${props =>
     props.width === "md" &&
     css`
       margin-left: -500px;
     `}
   ${props =>
     props.width === "sm" &&
     css`
       margin-left: -500px;
     `}
    ${props =>
      props.width === "xs" &&
      css`
        margin-left: -500px;
      `}

`;

const BtnContainer = styled.div`
  position: relative;
  width: 100%;
`;

const LoaderContainer = styled.div`
  margin-left: 40px;
  margin-top: -28px;
`;
const styles = theme => ({
  bar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: "solid 1px",
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  button: {
    marginLeft: theme.spacing.unit,
    backgroundColor: "#0071BC"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class Header extends Component {
  state = { anchorEl: null };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.title !== nextProps.title ||
      this.props.disablePDFBtn !== nextProps.disablePDFBtn
    );
  }

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    if (this.state.anchorEl !== null) {
      this.setState({ anchorEl: null });
    }
  };

  render() {
    let {
      classes,
      headerText,
      switchLabel,
      percent,
      showHelp,
      onHelpToggle,
      width,
      generatePDFFunc,
      disablePDFBtn,
      subHeaderText = "",
      title = ""
    } = this.props;

    return (
      <div>
        <Grid container direction="column">
          <Grid container spacing={12}>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Label width={width}>{headerText}</Label>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <ProgressConatiner>
                <Progress
                  percent={percent}
                  name={removeInvalidChars(title)}
                  progressWidth={45}
                  progressHeight={45}
                  width={100}
                  fontSize={width}
                />
              </ProgressConatiner>
            </Grid>
          </Grid>
          <Grid container spacing={12}>
            <Grid item lg={5} md={4} sm={4} xs={4}>
              <Label width={width}>{subHeaderText}</Label>
            </Grid>
            <Grid item lg={5} md={6} sm={6} xs={6}>
              <SwitchContainer width={width}>
                <span>{switchLabel}</span>
                <div>
                  <Switch
                    checked={showHelp}
                    onChange={onHelpToggle}
                    value={showHelp}
                    color="primary"
                  />
                </div>
              </SwitchContainer>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
              <BtnContainer>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={generatePDFFunc}
                  disabled={disablePDFBtn}
                >
                  <FileDownload className={classes.leftIcon} />
                  <div> {downloadLabel} </div>
                </Button>
              </BtnContainer>
              <LoaderContainer>
                {disablePDFBtn && (
                  <FadeIn>
                    <LoaderContainer>
                      <Loader
                        squareSize={0.1}
                        loaderWidth={20}
                        loaderHeight={2}
                      />
                    </LoaderContainer>
                  </FadeIn>
                )}
              </LoaderContainer>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Header.propTypes = {
  rightSideElements: array,
  isOpen: bool,
  title: string,
  sectionTitle: string,
  height: number,
  percent: number,
  classes: object,
  topLeftElement: object,
  topCenterElement: object,
  bottomLeftElement: object,
  bottomCenterElement: object
};

export default withStyles(styles)(withWidth()(Header));
