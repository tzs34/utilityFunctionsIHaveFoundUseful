import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Lock from "@material-ui/icons/Lock";
import OpenLock from "@material-ui/icons/LockOpen";

let { array, string, number, func } = PropTypes;

const styles = {
  root: {
    flexGrow: 1
  }
};

const TabBar = props => {
  let { label, showIconFunc, tabs, onChange, value, width } = props;
  let fullwidth = true;
  if (width === "sm" || width === "xs" || width === "md") {
    fullwidth = false;
  }
  let scroll = !fullwidth;
  return (
    <Tabs
      value={value}
      onChange={onChange}
      indicatorColor="primary"
      textColor="primary"
      fullWidth={fullwidth}
      scrollable={scroll}
    >
      {tabs &&
        tabs.map((o, index) => {
          let showIcon = showIconFunc(o);

          return (
            <Tab
              key={`${o.id}${index}`}
              value={index}
              label={o.id}
              disabled={showIcon}
              buttonStyle={
                showIcon
                  ? { color: "#525a5e", fontSize: 16, width: 250, opacity: 0.8 }
                  : { color: "#0071BC", fontSize: 14, width: 250 }
              }
              icon={
                showIcon ? (
                  <Lock style={{ color: "grey" }} />
                ) : (
                  <OpenLock style={{ color: "#0071BC" }} />
                )
              }
            />
          );
        })}
    </Tabs>
  );
};

TabBar.propTypes = {
  tabs: array,
  label: string,
  value: number,
  showIconFunc: func,
  onChange: func
};

export default withStyles(styles)(TabBar);
