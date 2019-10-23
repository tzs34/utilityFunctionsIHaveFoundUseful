import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SimpleRowChart from "../charts/simple-charts/simple-row-chart";
import TabBar from "../navigation/tab-bar";
import { HDivider, FadeIn } from "../../styles";
import {
  compose,
  addTwoDPZero,
  containsObject,
  getObjectByProp
} from "../../utils";
import ThemeContext from "../../context/theme-context";
import Copy from "../../copy";

let { array, func, object, number } = PropTypes;

let {
  labels: { tcLGLabel, tcTCLabel, tcSRLabel },
  optimizingTrainingScore,
  takingControlScore,
  lettingGoScore,
  ned,
  boundaryNotFoundMessage,
  maxWorkstreamScore
} = Copy;

const RowChartContainer = styled.div`
  margin: 20px 50px;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;
const TabbarContainer = styled.div`
  width: 90%;
  padding-left: 2%;
  padding-bottom: 20px;
`;
class AverageRatingComponent extends Component {
  state = {
    data: [],
    value: null,
    name: null,
    warning: false
  };

  static getDerivedStateFromProps(props, { value, name }) {
    let { tabs, onChange } = props;
    if (tabs && tabs.length > 0 && value === null) {
      value = tabs.findIndex(o => o.incomplete === false);
      let warning = !(value >= 0);
      value = value >= 0 ? value : 0;

      name = tabs[value].id;
      if (onChange) {
        onChange(name);
      }
      return {
        value,
        name,
        warning
      };
    }
    return { value, name };
  }

  getStageAverage = (thresholdScore, quartileScores, name) => {
    let label = "";
    let avg = "";

    if (thresholdScore < optimizingTrainingScore) {
      avg = quartileScores[name].lowerQBoundary;
      label = tcTCLabel;
    }
    if (
      thresholdScore < takingControlScore &&
      thresholdScore > optimizingTrainingScore
    ) {
      avg = quartileScores[name].midQBoundary;
      label = tcLGLabel;
    }
    if (
      thresholdScore < lettingGoScore &&
      thresholdScore > takingControlScore
    ) {
      avg = quartileScores[name].upperQBoundary;
      label = tcSRLabel;
    }

    return avg ? { label, value: avg } : { label: "", avg: "" };
  };

  getAreaName = (index, tabs) => {
    return tabs ? tabs[index].id : "";
  };

  onChange = (e, value) => {
    let { tabs, onChange } = this.props;
    let name = this.getAreaName(value, tabs);

    this.setState({ value, name }, function() {
      if (onChange) {
        onChange(name);
      }
    });
  };

  getBoundaryScore = (thresholdScore, quartileScores, name) => {
    if (thresholdScore === ned) {
      return 0;
    }
    if (thresholdScore < optimizingTrainingScore) {
      return quartileScores[name].lowerQBoundary;
    }
    if (thresholdScore < takingControlScore) {
      return quartileScores[name].midQBoundary;
    }
    if (thresholdScore < lettingGoScore) {
      return quartileScores[name].upperQBoundary;
    }
    return boundaryNotFoundMessage;
  };

  getScores = ({ scores }) => {
    return scores != null ? scores : [];
  };
  render() {
    let {
      tabs,
      workstreamScores,
      setRefsForPDF,
      thresholdScore,
      quartileScores,
      width
    } = this.props;
    let { value, name } = this.state;
    let { getScores, getBoundaryScore, onChange } = this;
    let boundaryScore = 0;
    let data = [];
    let stage = {};

    let { userScores, surveyScores } = workstreamScores;
    // let getUserObj = getObjectByProp.bind(null, "user", "id");
    // let getSurveyObj = getObjectByProp.bind(null, "survey", "id");
    // let getScoreObj = getObjectByProp.bind(null, name, "id");
    //
    // let userScoreObj = compose(
    //   getScoreObj,
    //   getScores,
    //   getUserObj
    // )(workstreamScores);

    // let surveyScores = getObjectByProp("survey", "id", workstreamScores);
    if (userScores && userScores.map && surveyScores && surveyScores.map) {
      boundaryScore = getBoundaryScore(thresholdScore, quartileScores, name);

      stage = this.getStageAverage(thresholdScore, quartileScores, name);
      let year = new Date().getFullYear();

      let userScoreObj = getObjectByProp(name, "workstream", userScores.map);

      let userScore = userScoreObj.activityAreas.reduce(
        (acc, { metrics: { average } }) => {
          return (acc += average);
        },
        0
      );

      let surveyScoreObj = getObjectByProp(
        name,
        "workstream",
        surveyScores.map
      );

      let surveyScore = surveyScoreObj.activityAreas.reduce(
        (acc, { average }) => {
          return (acc += average);
        },
        0
      );

      data = [
        {
          label: "Your index 2018",
          value: addTwoDPZero(userScore / userScoreObj.activityAreas.length)
        },
        {
          label: "Average 2018",
          value: addTwoDPZero(surveyScore / surveyScoreObj.activityAreas.length)
        },
        {
          label: stage.label,
          value:
            typeof boundaryScore === "string"
              ? boundaryScore
              : addTwoDPZero(boundaryScore)
        }
      ];
    }

    return (
      <ThemeContext.Consumer>
        {theme => {
          let { chartColors } = theme;
          return (
            <div>
              <TabbarContainer>
                <TabBar
                  tabs={tabs}
                  onChange={onChange}
                  value={value}
                  label={"key"}
                  showIconFunc={o => o.completed === false}
                  tabFunc={tabs => tabs.findIndex(o => o.complete === true)}
                  width={width}
                />
              </TabbarContainer>
              <HDivider />
              <FadeIn>
                <RowChartContainer>
                  <div id="rowchart" ref={setRefsForPDF}>
                    <SimpleRowChart
                      maxValue={maxWorkstreamScore}
                      data={data}
                      width={90}
                      height={500}
                      colors={chartColors}
                      minBarSize={1}
                    />
                  </div>
                </RowChartContainer>
              </FadeIn>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

AverageRatingComponent.propTypes = {
  tabs: array,
  activeWorkstreams: array,
  setRefsForPDF: func,
  thresholdScore: number,
  quartileScores: object
};

export default AverageRatingComponent;
