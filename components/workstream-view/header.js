import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import BreadCrumb from "../navigation/bread-crumb";
import Button from "@material-ui/core/Button";
import NotesIcon from "@material-ui/icons/Note";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import Switch from "@material-ui/core/Switch";
import { HeaderLabel, FlexRow } from "../../styles";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

let { array, bool, string, number, object } = PropTypes;

const HeaderContainer = styled.div`
  padding: 5px;
  margin-top: 10px;
  ${props =>
    props.width === "lg" &&
    css`
      width: 125%;
      height: 110px;
    `}
   ${props =>
     props.width === "md" &&
     css`
       width: 115%;
       height: 100px;
     `}
   ${props =>
     props.width === "sm" &&
     css`
       width: 120%;
       height: 105px;
     `}
    ${props =>
      props.width === "xs" &&
      css`
        width: 100%;
        height: 105px;
      `}
`;

const Label = HeaderLabel.extend`
margin-left: 1.5em;
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
     font-size: 1em;
   `}
  ${props =>
    props.width === "xs" &&
    css`
      font-size: 0.9em;
    `}
`;
const SwitchContainer = FlexRow.extend`
  justify-content: space-evently;

  ${props =>
    props.width === "lg" &&
    css`
      width: 500px;
      margin-top: -10px;
    `}
   ${props =>
     props.width === "md" &&
     css`
       width: 330px;
       margin-top: -5px;
     `}
   ${props =>
     props.width === "sm" &&
     css`
       width: 310px;
       margin-top: -5px;
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
        font-size: 1.1em;
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
const BtnContainer = styled.div`

  margin-top: -15px;
   ${props =>
     props.width === "xl" &&
     css`
       margin-left: 60%;
     `}
  ${props =>
    props.width === "lg" &&
    css`
      margin-left: 25%;
    `}
  ${props =>
    props.width === "md" &&
    css`
      margin-left: 15%;
    `}
  ${props =>
    props.width === "sm" &&
    css`
      margin-left: 15%;
    `}
   ${props =>
     props.width === "xs" &&
     css`
       margin-left: 15%;
     `}
`;

const BreadCrumbContainer = styled.div`
  margin-left: 1em;
`;
const styles = theme => ({
  root: {
    flexGrow: 1,
    border: "none",
    boxShadow: "none"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    background: "#f5f5f5"
  },
  button: {
    margin: theme.spacing.unit * 2,
    width: 250,
    height: 40
  },
  icon: {
    marginRight: theme.spacing.unit
  }
});

class Header extends Component {
  state = { anchorEl: null };

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
      areas,
      classes,
      crumbs,
      title,
      headerLabel,
      switchLabel,
      notesLabel,
      showHelp,
      handleBreadcrumbOnClick,
      onNotesClick,
      onDropDownChange,
      onHelpToggle,
      width
    } = this.props;

    let { handleClick, handleClose } = this;

    let { anchorEl } = this.state;

    return (
      <HeaderContainer width={width}>
        <Grid container spacing={12} alignItems="space-evenly">
          <Grid item lg={3} md={4} sm={3} xs={4}>
            <div>
              <Label width={width}>{headerLabel}</Label>
            </div>
            <BreadCrumbContainer>
              <BreadCrumb
                crumbs={crumbs}
                onClick={handleBreadcrumbOnClick}
                width={500}
              />
            </BreadCrumbContainer>
          </Grid>
          <Grid item lg={3} md={3} alignItems="flex-start">
            <div>
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
            </div>
          </Grid>
          <Grid item lg={6} md={6} direction="column" alignItems="flex-end">
            <BtnContainer width={width}>
              <div>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={handleClick}
                >
                  {title}
                </Button>
                <ClickAwayListener onClickAway={handleClose}>
                  <Collapse
                    id="menu-list-collapse"
                    style={{ transformOrigin: "0 0 0" }}
                  >
                    <Menu
                      id="tmi-area-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {areas.map(({ value }, index) => {
                        return (
                          <MenuItem
                            key={`${value}${index}`}
                            value={index}
                            onClick={() => {
                              onDropDownChange(value);
                            }}
                          >
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </Collapse>
                </ClickAwayListener>
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  aria-label="Notes"
                  onClick={onNotesClick}
                >
                  {notesLabel}
                  <NotesIcon className={classes.icon} />
                </Button>
              </div>
            </BtnContainer>
          </Grid>
        </Grid>
      </HeaderContainer>
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
