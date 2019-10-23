import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FlexRow } from "../../styles";
import ThemeContext from "../../context/theme-context";
import ChevronUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Info from "@material-ui/icons/Info";
import InfoTip from "../display/info-tip";
import Copy from "../../copy";

let { array, number } = PropTypes;

const {
  labels: { noQuestionsLabel, dcAxisLabel }
} = Copy;

const yaxisValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const barSpacing = 65;
const unitPixels = 75;
const axisConst = 375;

const XAxisLabel = FlexRow.extend`
  flex-direction: column;
  width: 100%;
  align-items: center;
  justfiy-content: center;
  align-items: center;
  align-content: center;
  & svg {
    margin-left: -30px;
  }
`;
const Tick = styled.span`
  position: absolute;
  top: 45px;
  left: ${props => props.position}px;
  display: block;
  padding: 5px;
  font-size: 600;
  color: black;
`;
const NoValuesMessage = styled.span`
  position: absolute;
  top: 20px;
  right: 50px;
  width: 300px;
  display: block;
  text-align: left;
  font-size: 1.2em;
  font-weight: 900;
`;
const QuestionContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: -100px;
`;
const Chart = FlexRow.extend`
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  min-width: 1000px;
  margin-bottom: 80px;
`;
const ChartColumn = FlexRow.extend`
  flex-direction: column;
  width: ${props => props.width}px;
`;
const ChartBackground = styled.div`
  position: relative;
  width: 750px;
  height: 300px;
`;
const BackgroundDiv = styled.div`
  position: absolute;
  background: ${props => props.color};
  top: 0;
  left: ${props => props.left}px;
  width: ${props => props.size}px;
  height: 300px;
`;
const XAxis = styled.div`
  position: absolute;
  border-style: dotted;
  border-width: 4px;
  height: 290px;
  width: 1px;
  left: ${props => props.left}px;
  border-color: ${props => props.color};
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const Container = styled.div`
  position: relative;
  height: 300px;
  background-color: transparent;
`;
const LargeContainer = Container.extend`
  width: 750px;
`;
const SmallContainer = Container.extend`
  width: 300px;
`;
const YAxisContainer = styled.div`
  position: absolute;
  width: 780px;
  height: 100px;
  left: -12px;
`;
const AverageContainer = styled.div`
  position: absolute;
  top: 2px;
  left: 355px;
  & span {
    font-size: 600;
    color: black;
  }
`;
const InfoTipContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 350px;
`;

const Question = styled.span`
  display: block;
  text-align: left;
  width: 400px;
  font-size: 1.1em;
  font-weight: 600;
`;

class DivergeChart extends Component {
  static Bar = ({ value, top, negative = false }) => {
    let dotcss = [
      "& span {display: none; font-weight: 600; width: 100px; margin-top: -1em; padding: 0.25em; }",
      "&:hover .show {display: block;}"
    ];

    let position = value * unitPixels;
    let align = axisConst - position;
    let barPosition = negative ? [`left: ${align}px;`] : [`right: ${align}px;`];
    let BarContainer = styled("div")(barPosition, {
      position: "absolute",
      height: "12px",
      top: `${top}px`,
      width: `${position}px`
    });

    let barOrder = negative ? 2 : 1;
    let dotOrder = negative ? 1 : 2;

    let Dot = styled("div")(dotcss, {
      background: "#000000",
      "border-radius": "50px",
      width: "10px",
      height: "10px",
      order: dotOrder
    });
    let Bar = styled("div")(barOrder, {
      width: "100%",
      height: "2px",
      background: "#000000",
      order: barOrder
    });
    return (
      <BarContainer>
        <FlexRow>
          <Bar />
          <Dot>
            <span className="show">
              {negative ? `Score = -${value}` : `Score = ${value}`}
            </span>
          </Dot>
        </FlexRow>
      </BarContainer>
    );
  };

  renderBars = ({ values }) => {
    if (values.length > 0) {
      return values.map(({ difference }, index) => {
        let dif = difference > 5 ? 5 : difference;
        let value = dif > 0 ? dif : dif * -1;
        let negative = dif < 0;
        let top = index > 0 ? barSpacing * (index + 1) : barSpacing;
        return (
          <DivergeChart.Bar
            negative={negative}
            value={Number(value).toFixed(1)}
            top={top}
          />
        );
      });
    }
    return <NoValuesMessage>{noQuestionsLabel}</NoValuesMessage>;
  };

  renderQuestions = ({ values }, color) => {
    if (values) {
      return values.map(({ question }, index) => {
        let top = index > 0 ? barSpacing * (index + 1) : barSpacing;
        return (
          <QuestionContainer top={top} key={index}>
            <Question>{question}</Question>
          </QuestionContainer>
        );
      });
    }
    return null;
  };

  render() {
    let { data } = this.props;
    let { renderBars, renderQuestions } = this;
    let year = new Date().getFullYear();

    return (
      <ThemeContext.Consumer>
        {theme => {
          let {
            tmLtGrey,
            tmGrey,
            tmDCDkPink,
            tmDCMidPink,
            tmDCLtPink,
            tmDCDkGreen,
            tmDCMidGreen,
            tmDCLtGreen,
            tmMidBlack
          } = theme;

          return (
            <Chart>
              <ChartColumn>
                <SmallContainer>
                  <Overlay>
                    <SmallContainer>
                      {renderQuestions(data, tmGrey)}
                    </SmallContainer>
                  </Overlay>
                </SmallContainer>
              </ChartColumn>
              <ChartColumn>
                <ChartBackground>
                  <BackgroundDiv size={150} color={tmDCDkPink} left={0} />
                  <BackgroundDiv size={150} color={tmDCMidPink} left={150} />
                  <BackgroundDiv size={75} color={tmDCLtPink} left={300} />
                  <XAxis color={tmMidBlack} left={374} />
                  <BackgroundDiv size={75} color={tmDCLtGreen} left={375} />
                  <BackgroundDiv size={150} color={tmDCMidGreen} left={450} />
                  <BackgroundDiv size={150} color={tmDCDkGreen} left={600} />
                  <Overlay>
                    <LargeContainer>{renderBars(data)}</LargeContainer>
                    <LargeContainer>
                      <YAxisContainer>
                        <AverageContainer>
                          <XAxisLabel>
                            <ChevronUpIcon />
                            <span
                              style={{ marginLeft: -10 }}
                            >{`Average (${year})`}</span>
                          </XAxisLabel>
                          <InfoTipContainer>
                            <InfoTip
                              text={dcAxisLabel}
                              position={"left"}
                              arrowPosition={"down"}
                              icon={Info}
                              color={tmLtGrey}
                              id={"dcavginfo"}
                            />
                          </InfoTipContainer>
                        </AverageContainer>
                        {yaxisValues.map((val, index) => {
                          let pos = index > 0 ? index * unitPixels : index;
                          return (
                            <Tick key={index} val={val} position={pos}>
                              {val}
                            </Tick>
                          );
                        })}
                      </YAxisContainer>
                    </LargeContainer>
                  </Overlay>
                </ChartBackground>
              </ChartColumn>
            </Chart>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

DivergeChart.propTypes = {
  height: number.isRequired,
  data: array.isRequired
};

export default DivergeChart;
