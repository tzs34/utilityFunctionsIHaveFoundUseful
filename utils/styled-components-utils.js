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

import styled, { keyframes, injectGlobal } from "styled-components";

const Theme = {
  tmLtBlue: "#00B0BA",
  tmBlue: "#0071BC",
  tmDkBlue: "#002E7D",
  tmLtPurple: "#512DA8",
  tmPurple: "#542378",
  tmWhite: "#FFFFFF",
  tmLtGrey: "#F0F0F0",
  tmGrey: "#555555",
  tmLabelGrey: "#757575",
  tmDkGrey: "#262626",
  tmPink: "#DB1F6A",
  chartColors: ["#542378", "#0073BA", "#002E7D"],
  tmDCDkPink: "#E57373",
  tmDCMidPink: "#EF9A9A",
  tmDCLtPink: "#FFCDD2",
  tmDCDkGreen: "#AED581",
  tmDCMidGreen: "#C5E1A5",
  tmDCLtGreen: "#DCEDC8",
  tmGoGreen: "#00FF00",
  tmMidBlack: "#414a4c",
  tmMidRed: "#FF0000",
  tmDefaultHelp: "#B0BEC5"
};

const FlexRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const GridRow = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const GridColumn = styled.div`
  position: relative;
  background: #ffffff;
  text-align: center;
  border: 0.2rem solid #f5f5f5;
  width: ${props => (props.size / 12) * 100}vw;
  min-height: ${props => props.height}vh;

  h1 {
    margin: 0;
    background: #ffffff;
  }

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

const DashboardHeader = styled.div`
  text-align: center;
  position: relative;
  height: 30px;
  padding: 15px 20px 2px 30px;
  font-size: 14px;
  color: #525a5e;
`;
const fadeInto = keyframes`
  from {
    opacity: 0;
    height: 0%;
  }

  to {
    opacity: 1;
    height: 100%;
  }
`;

const fadeOutof = keyframes`
  from {
    opacity: 1;
    height: 100%;
  }

  to {
    opacity: 0;
    height: 0%;
  }
  `;
const Fade = styled.div`
  width: 100%;
  display: ${props => props.display}
  animation: ${props =>
    props.fadeIn ? `${fadeInto} 0.5s linear` : `${fadeOutof} 0.5s linear`};
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

const borderAnimation = keyframes`

  0% {
    transform: translateX(-100%);
  }
  100% {
        transform: translateX(0);
      }
  `;

const FadeIn = styled.div`
  animation: ${fadeIn} 0.5s linear;
`;
const FadeOut = styled.div`
  animation: ${fadeOut} 0.5s linear;
`;
const ResizeHandle = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  cursor: se-resize;

  & :after {
    content: "";
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 5px;
    height: 5px;
    border-right: 2px solid rgba(0, 0, 0, 0.4);
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  }
`;

const BoxAnim = keyframes`
0%, 100% {
  box-shadow: -13px 20px 0 #0C6FB2, 13px 20px 0 rgba(12,111,178, 0.8), 13px 46px 0 #4C4596, -13px 46px 0 #0C4688; }
25% {
  box-shadow: -13px 20px 0 rgba(12,111,178, 0.8), 13px 20px 0  #4C4596, 13px 46px 0 #0C4688, -13px 46px 0 rgba(12,111,178, 0.8); }
50% {
  box-shadow: -13px 20px 0 rgba(12,111,178, 0.8), 13px 20px 0 rgba(12,111,178, 0.8), 13px 46px 0  #4C4596, -13px 46px 0 #0C4688; }
75% {
  box-shadow: -13px 20px 0 #0C4688, 13px 20px 0 rgba(12,111,178, 0.8), 13px 46px 0 rgba(12,111,178, 0.8), -13px 46px 0 #4C4596; }
`;

const Loader = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  animation: ${BoxAnim} 1s ease infinite;
`;

const TwoEqualColLayout = styled.div`
  display: flex;
  align-items: center;
  & div {
    flex: 1;
  }
`;
const ChartHeader = styled.div`
  display: block;
  font-size: 18px;
  color: #525a5e;
  margin: 1em 0.25em 0.25em 1em;
  text-align: center;
`;
const baseStyle = () => injectGlobal`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    font-family: 'Roboto';
   margin: 0;
   padding: 0;
   border: 0;
   font-size: 100%;
   font: inherit;
   vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
   display: block;
  }
  body {
   line-height: 1;
   font-family: 'Roboto';
   overflow: visible;
  }
  ol, ul {
   list-style: none;
  }
  blockquote, q {
   quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
   content: '';
   content: none;
  }
  table {
   border-collapse: collapse;
   border-spacing: 0;
  }
   body{
      background: #f5f5f5;
      font-family: Roboto, sans-serif;
    }
  `;
const tooltipStyle = {
  fontSize: 16,
  fontFamily: "Roboto, sans serif",
  backgroundColor: "#000000",
  padding: 8,
  marginTop: -20
};

const BackgroundDiv = styled.div`
  height: 100%;
  background: #f5f5f5;
  width: ${props => (props.isOpen ? 90 : 100)}%;
`;
const HDivider = styled.hr`
  background-color: #eceff1;
  width: 100%;
  opacity: 0.8;
`;
const BlockSpan = styled.span`
  display: block;
`;
const Label = styled.span`
  display: block;
  font-size: 1.5em;
  font-weignt: 600;
  text-align: center;
  padding: 0.25em;
  color: #000000;
`;
const HeaderLabel = Label.extend`
  text-align: left;
  margin-bottom: 1em;
`;

const RowHeaderContent = FlexRow.extend`
  align-items: left;
  justify-content: space-between;
  padding: 0.2em 0.5em;
  height: 40px;
  width: 99%;
`;
const Opacity = styled.div`
  opacity: ${props => (props.hide ? 0.2 : 1)};
`;
const CenterVerticalHorizontal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom-width: ${props => props.width}px;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.color};
`;
const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top-width: ${props => props.width}px;
  border-top-style: solid;
  border-top-color: ${props => props.color};
`;
const ArrowLeft = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-right-width: ${props => props.width}px;
  border-right-style: solid;
  border-right-color: ${props => props.color};
`;
const ArrowRight = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-left-width: ${props => props.width}px;
  border-left-style: solid;
  border-left-color: ${props => props.color};
`;
const setArrowPosition = (position, borderColor, color) => {
  let positions = {
    bottomCenter: [
      '&:after, &:before {top: 100%;left: 50%;border: solid transparent; content: " ";height: 0;width: 0;position: absolute;pointer-events: none;}',
      `&:after {border-top-color: ${borderColor}; border-width: 10px; margin-left: -10px }`,
      `&:before {border-top-color: ${color};border-width: 16px;margin-left: -16px;}`
    ],
    bottomLeft: [
      '&:after, &:before {top: 100%;left: 2%;border: solid transparent; content: " ";height: 0;width: 0;position: absolute;pointer-events: none;}',
      `&:after {border-top-color: ${borderColor}; border-width: 10px; margin-left: -10px }`,
      `&:before {border-top-color: ${color};border-width: 16px;margin-left: -16px;}`
    ],
    bottomRight: [
      '&:after, &:before {top: 100%; right: 2%;border: solid transparent; content: " ";height: 0;width: 0;position: absolute;pointer-events: none;}',
      `&:after {border-top-color: ${borderColor}; border-width: 10px; margin-left: -10px }`,
      `&:before {border-top-color: ${color};border-width: 16px;margin-left: -16px;}`
    ],
    topCenter: [
      '&:after, &:before {bottom: 100%; left: 50%; border: solid transparent; content: " "; height: 0; width: 0; position: absolute; pointer-events: none;}',
      `&:after {border-bottom-color:${borderColor} ; border-width: 10px; margin-left: -10px;}`,
      `&:before {border-bottom-color: ${color}; border-width: 16px; margin-left: -16px;}`
    ],
    topLeft: [
      '&:after, &:before {bottom: 100%; left: 2%; border: solid transparent; content: " "; height: 0; width: 0; position: absolute; pointer-events: none;}',
      `&:after {border-bottom-color:${borderColor} ; border-width: 10px; margin-left: -10px;}`,
      `&:before {border-bottom-color: ${color}; border-width: 16px; margin-left: -16px;}`
    ],
    topRight: [
      '&:after, &:before {bottom: 100%; right 2%; border: solid transparent; content: " "; height: 0; width: 0; position: absolute; pointer-events: none;}',
      `&:after {border-bottom-color:${borderColor} ; border-width: 10px; margin-left: -10px;}`,
      `&:before {border-bottom-color: ${color}; border-width: 16px; margin-left: -16px;}`
    ],
    rightCenter: [
      '&:after, &:before {left: 100%; top: 50%; border: solid transparent; content: " "; height: 0; width: 0; position: absolute; pointer-events: none;}',
      "&:after {border-color: rgba(136, 183, 213, 0); border-left-color: #88b7d5; border-width: 10px; margin-top: -10px;}",
      "&:before { border-color: rgba(194, 225, 245, 0); border-left-color: #c2e1f5; border-width: 16px; margin-top: -16px;}"
    ],
    leftCenter: [
      '&:after, &:before { right: 100%; top: 50%; border: solid transparent; content: " "; height: 0; width: 0; position: absolute; pointer-events: none; }',
      "&:after { border-color: rgba(136, 183, 213, 0); border-right-color: #88b7d5; border-width: 10px; margin-top: -10px; }",
      "&:before { border-color: rgba(194, 225, 245, 0); border-right-color: #c2e1f5; border-width: 16px; margin-top: -16px;}"
    ]
  };

  return positions[position];
};

export {
FlexRow, FadeIn, FadeOut,
  Theme,
  FlexRow,
  GridRow,
  GridColumn,
  DashboardHeader,
  FadeIn,
  FadeOut,
  Fade,
  ResizeHandle,
  Loader,
  TwoEqualColLayout,
  HDivider,
  ChartHeader,
  baseStyle,
  tooltipStyle,
  borderAnimation,
  BackgroundDiv,
  BlockSpan,
  Label,
  HeaderLabel,
  RowHeaderContent,
  Opacity,
  CenterVerticalHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  setArrowPosition
};

