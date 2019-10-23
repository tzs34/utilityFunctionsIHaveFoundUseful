import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SimpleRowChart from "../charts/simple-charts/simple-row-chart";
import {
  compose,
  addTwoDPZero,
  containsObject,
  getObjectByProp
} from "../../utils";
import ThemeContext from "../../context/theme-context";
import Copy from "../../copy";

let { array, func, object, number, string } = PropTypes;

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
const AverageRatingDisplayComponent = ({
  chartColors,
  workstreamScores,
  thresholdScore,
  quartileScores,
  name,
  width
}) => {
  function getStageAverage(thresholdScore, quartileScores, name) {
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
  }

  function getAreaName(index, tabs) {
    return tabs ? tabs[index].id : "";
  }

  function getBoundaryScore(thresholdScore, quartileScores, name) {
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
  }

  function getScores({ scores }) {
    return scores != null ? scores : [];
  }

  let boundaryScore = 0;
  let data = [];
  let stage = {};

  let getUserObj = getObjectByProp.bind(null, "user", "id");
  let getSurveyObj = getObjectByProp.bind(null, "survey", "id");
  let getScoreObj = getObjectByProp.bind(null, name, "id");

  let userScoreObj = compose(
    getScoreObj,
    getScores,
    getUserObj
  )(workstreamScores);

  let surveyScores = getObjectByProp("survey", "id", workstreamScores);
  if (
    userScoreObj &&
    userScoreObj.average &&
    surveyScores &&
    surveyScores.scores
  ) {
    boundaryScore = getBoundaryScore(thresholdScore, quartileScores, name);

    stage = getStageAverage(thresholdScore, quartileScores, name);
    let year = new Date().getFullYear();

    data = [
      {
        label: `Your index ${year}`,
        value: addTwoDPZero(userScoreObj.average)
      },
      {
        label: `Average rating ${year}`,
        value: addTwoDPZero(surveyScores.scores[name])
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
    <div>
      <RowChartContainer>
        <div id="rowchart">
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
    </div>
  );
};

AverageRatingDisplayComponent.propTypes = {
  tabs: array,
  activeWorkstreams: array,
  setRefsForPDF: func,
  colors: array,
  thresholdScore: number,
  quartileScores: object,
  name: string
};

export default AverageRatingDisplayComponent;
