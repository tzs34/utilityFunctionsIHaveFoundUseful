import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SimpleBarChart from "../charts/simple-charts/simple-bar-chart";
import Axis from "../charts/axis";
import { FlexRow } from "../../styles";
import ThemeContext from "../../context/theme-context";

let { array } = PropTypes;

const MyBenchmarkContainer = FlexRow.extend`
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 5px;
`;
const MyBenchmarkChart = styled.div`
  padding: 0.2em;
`;
const BarChartContainer = FlexRow.extend`
  justify-content: space-evently;
  height: ${props => props.height}px;
  width: 100%;
  & label {
    font-weight: 800;
  }
`;

const BenchmarkChart = props => {
  let { benchmarkRatings } = props;
  return (
    <ThemeContext.Consumer>
      {theme => {
        let { chartColors } = theme;
        return (
          <MyBenchmarkContainer>
            <MyBenchmarkChart>
              {benchmarkRatings &&
                benchmarkRatings.length > 0 && (
                  <div>
                    <BarChartContainer height={300}>
                      <div>
                        <Axis
                          position={"left"}
                          height={280}
                          width={40}
                          min={0}
                          max={90}
                          tickCount={4}
                        />
                      </div>
                      {benchmarkRatings.map(({ ratings, year }, index) => {
                        return (
                          <SimpleBarChart
                            maxValue={100}
                            data={ratings}
                            width={150}
                            height={100}
                            colors={chartColors}
                            label={year}
                            showKey={index + 1 === benchmarkRatings.length}
                          />
                        );
                      })}
                    </BarChartContainer>
                  </div>
                )}
            </MyBenchmarkChart>
          </MyBenchmarkContainer>
        );
      }}
    </ThemeContext.Consumer>
  );
};

BenchmarkChart.propTypes = {
  benchmarkRatings: array
};

export default BenchmarkChart;
