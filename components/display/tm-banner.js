import React, { Component } from "react";
import styled, { css } from "styled-components";
import { SocialIcon } from "react-social-icons";
import Grid from "@material-ui/core/Grid";
import Telephone from "@material-ui/icons/Call";
import Email from "@material-ui/icons/Email";
import Copy from "../../copy";
import { FlexRow } from "../../styles";
import ThemeContext from "../../context/theme-context";

import withWidth from "@material-ui/core/withWidth";

let {
  towardsmaturity: { tmTelNumber, tmEmailAddress },
  logoBase64
} = Copy;

const iconStyle = { height: 25, width: 25, padding: 4, marginLeft: 5 };

const BannerContainer = styled.div`
  padding: 5px;
  background: transparent;
`;
const Logo = styled.div`
  height: 32px;
  width: 90px;
  color: #757575;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 900;
  line-height: 18px;
  text-align: center;
  word-wrap: break-word;
  margin-left: 5%;
  padding: 5px 0px 5px 5px;
  margin-top: 0.4em;
`;

const Contact = styled.span`
  display: block;
  padding: 0em 1em;
  & a {
    text-decoration: none;
    color: black;
  }
`;
const SocialIconContainer = FlexRow.extend`
  margin-top: 18px;
  justify-content: flex-start;
  ${props =>
    props.width === "lg" &&
    css`
      margin-left: 35px;
    `}
   ${props =>
     props.width === "md" &&
     css`
       margin-left: 55px;
     `}
   ${props =>
     props.width === "sm" &&
     css`
       margin-left: 60px;
     `}
    ${props =>
      props.width === "xs" &&
      css`
        margin-left: 60px;
      `}

`;
const IconRow = FlexRow.extend`
  width: 60px;
  margin-top: -1em;
`;

class TMBanner extends Component {
  render() {
    let { width } = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <BannerContainer width={width}>
            <Grid container spacing={8} alignItems="baseline">
              <Grid item lg={1} md={1} sm={1} xs={1}>
                <Logo>
                  <a href="https://towardsmaturity.org/">
                    <img
                      src={logoBase64}
                      alt="logo"
                      style={{ width: 120, height: 33 }}
                    />
                  </a>
                </Logo>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={7}>
                <SocialIconContainer width={width}>
                  <Telephone />
                  <Contact>{tmTelNumber}</Contact>
                  <Email />
                  <Contact>
                    <a href="mailto:analysts@towardsmaturity.org">
                      {tmEmailAddress}
                    </a>
                  </Contact>
                  <IconRow>
                    <SocialIconContainer width={width}>
                      <SocialIcon
                        url="http://www.twitter.com/TowardsMaturity"
                        color={theme.tmMidBlack}
                        style={iconStyle}
                      />
                    </SocialIconContainer>
                    <SocialIconContainer width={width}>
                      <SocialIcon
                        url="https://www.instagram.com/towards_maturity"
                        color={theme.tmMidBlack}
                        style={iconStyle}
                      />
                    </SocialIconContainer>
                    <SocialIconContainer width={width}>
                      <SocialIcon
                        url="https://www.linkedin.com/company/towards-maturity/"
                        color={theme.tmMidBlack}
                        style={iconStyle}
                      />
                    </SocialIconContainer>
                  </IconRow>
                </SocialIconContainer>
              </Grid>
            </Grid>
          </BannerContainer>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default withWidth()(TMBanner);
