/* eslint-disable */
import React, { Component, createRef } from "react";
import ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import HTML2Canvas from "html2canvas";
import { FlexRow, Theme, HDivider } from "../../styles";
import Copy from "../../copy";
import Locale from "../../i18n/i18n";
import {
  uppercaseSplit,
  insertIntoArray,
  compose,
  getObjectByProp,
  monthNames,
  round,
  addTwoDPZero
} from "../../utils";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { pdfStyles, pdfContent, tcLabels, imgTemplate } from "./pdf-content";
import {
  BenchmarkChart,
  DashboardHeader,
  TransformationCurve,
  DivergenceChart,
  AvgRatingSection,
  AvgChartsDisplay,
  SeeMoreList,
  ItemRenderer,
  ScoreDisplay,
  ScoreTable
} from "../../components";

const {
  colors: { barChartColors },
  logoBase64,
  labels: { userRow, benchmarkRow, avgRow },
  template: { _logo, _header, _tcurve, _averages, _companyName, _currentDate }, //_logo, _header,
  titles: {
    tjTitle,
    techTitle,
    tmiTitle,
    tmTitle,
    ctTitle,
    dgTitle,
    bmTitle,
    ldSkillsTitle
  },
  workstreamNames: { ALIGN, LISTEN, ENGAGE, ENABLE, IMPROVE, INFLUENCE },
  pdfTitle,
  dashboardText,
  dashboardHeaderLabel,
  userTypes: { premium }
} = Copy;

const { chartColors } = Theme;

const { languageCode, dateOptions } = Locale;

const noop = () => {};

const PDFSourceContainer = styled.div`
  width: 1200px;
  height: 1200px;
`;

const TransformationCurveContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
`;

const OutterDiv = styled.div`
  position: relative;
`;

const InnerDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  botom: 0;
  right: 0;
`;

const DivergeChartContainer = styled.div`
  margin-left: 200px;
`;

const Title = styled.div`
  padding: 0.5em;
  font-size: 2em;
  width: 100%
  text-align: center;
  font-weight: 900;
  margin-bottom: 40px;
`;

const FPTitle = styled(Title)`
  font-weight: 900;
  font-size: 4.5em;
`;

const Label = styled.div`
  padding: 0.5em;
  font-size: 1.5em;
  font-weight: 600;
  width: 100%
  text-align: left;
`;

const ListRow = styled(FlexRow)`
  margin-top: 30px;
  padding: 40px;
  justify-content: space-around;
  width: 100%;
  font-weight: 900;
`;
const { vfs } = vfsFonts.pdfMake;

class PDFGenerator extends Component {
  imageData = [];
  encoded = [];
  componentList = [
    "frontPage",
    "sectionOne",
    "sectionTwo",
    "sectionThree",
    "sectionFour",
    "sectionFive",
    "sectionSix",
    "sectionSeven",
    "sectionEight"
  ]; //_logo, _header,
  state = {
    component: null,
    showImages: false
  };

  static TransitionCurveComponent = ({ data }) => {
    let { userTmIndexScore } = data;
    return (
      <TransformationCurve
        height={200}
        value={userTmIndexScore}
        pdfSize={"pdf"}
      />
    );
  };

  static DivergenceChart = ({ data: { derivationChartData }, workstream }) => {
    let chartData = getObjectByProp(workstream, "name", derivationChartData);
    return (
      <div>
        {chartData != null && (
          <DivergeChartContainer>
            <DivergenceChart data={chartData} width="sm" />
          </DivergeChartContainer>
        )}
      </div>
    );
  };

  static AvgRatingSection = ({
    data: { workstreamScores, quartileScores, userTmIndexScore },
    name
  }) => {
    let userWorkstreams = getObjectByProp("user", "id", workstreamScores);
    return (
      <AvgChartsDisplay
        workstreamScores={workstreamScores}
        quartileScores={quartileScores}
        thresholdScore={userTmIndexScore}
        chartColors={chartColors}
        name={name}
      />
    );
  };

  static BenchmarkChart = ({ data: { benchmarkRatings } }) => {
    return <BenchmarkChart benchmarkRatings={benchmarkRatings} />;
  };

  static ListItemRenderer = (
    { question, usedByUser, percentage = null },
    index
  ) => {
    let showPercent = percentage !== null;
    return (
      <div key={index}>
        <ItemRenderer
          question={question}
          percentage={percentage}
          showIcon={usedByUser}
          color={"#757575"}
          showPercent={showPercent}
          width={"xs"}
        />
      </div>
    );
  };

  static Lists = ({
    data: { surveyLnDSkills, surveyBarriers, surveyTechnologies }
  }) => {
    return (
      <ListRow>
        <div>
          <Title>{techTitle}</Title>
          <SeeMoreList
            items={surveyTechnologies}
            listSize={5}
            renderFunction={PDFGenerator.ListItemRenderer}
            showBtn={false}
          />
        </div>
        <div>
          <Title>{bmTitle}</Title>
          <SeeMoreList
            items={surveyBarriers}
            listSize={5}
            renderFunction={PDFGenerator.ListItemRenderer}
            showBtn={false}
          />
        </div>
        <div>
          <Title>{ldSkillsTitle}</Title>
          <SeeMoreList
            items={surveyLnDSkills}
            listSize={5}
            renderFunction={PDFGenerator.ListItemRenderer}
            showBtn={false}
          />
        </div>
      </ListRow>
    );
  };

  static ScoreDisplay = ({ data: { workstreamMaps }, workstream }) => {
    let userWorkstreamObj = getObjectByProp("user", "id", workstreamMaps);
    let surveyWorkstreamObj = getObjectByProp("survey", "id", workstreamMaps);

    let userData = getObjectByProp(
      workstream,
      "workstream",
      userWorkstreamObj.map
    );
    let surveyData = getObjectByProp(
      workstream,
      "workstream",
      surveyWorkstreamObj.map
    );
    let userActivityAreaData = userData.activityAreas;
    let surveyActvityAreaData = surveyData.activityAreas;

    let scoreData = userActivityAreaData.map(
      ({ name, metrics: { average } }, index) => {
        let { activityAreas } = surveyData;
        let o = {};
        o.label = name;
        o.userValue = addTwoDPZero(average);
        o.surveyValue = activityAreas[index]
          ? addTwoDPZero(activityAreas[index].average)
          : "Not Found";
        o.sindValue = null;

        return o;
      }
    );

    let userDataAverageCount = userActivityAreaData.reduce(
      (acc, { metrics: { average } }) => {
        return (acc += average);
      },
      0
    );

    let surveyDataAverageCount = surveyActvityAreaData.reduce(
      (acc, { average }) => {
        return (acc += average);
      },
      0
    );

    let userValue = addTwoDPZero(
      userDataAverageCount / userActivityAreaData.length
    );
    let surveyValue = addTwoDPZero(
      surveyDataAverageCount / surveyActvityAreaData.length
    );
    let percentage = ((userValue - surveyValue) / surveyValue) * 100;

    scoreData.push({
      label: workstream,
      userValue,
      surveyValue,
      sindValue: null
    });

    return (
      <div>
        {userValue != null ? (
          <div>
            <ScoreDisplay
              percentage={round(percentage)}
              name={workstream}
              score={addTwoDPZero(userValue)}
              width={"sm"}
            />
            <HDivider />
            <ScoreTable data={scoreData} width={"sm"} />
          </div>
        ) : null}
      </div>
    );
  };

  static Logo = () => {
    return (
      <img
        src={logoBase64}
        alt="company logo"
        style={{ width: 120, height: 33 }}
      />
    );
  };

  setSection = async ref => {
    let { imageData, componentList, layoutPDF, encodeToBase64 } = this;

    if (ref) {
      let result = await encodeToBase64(ref);
      imageData.push(result);

      if (imageData.length === componentList.length) {
        layoutPDF(imageData);
      }
    }
  };

  layoutPDF = base64imgs => {
    pdfMake.vfs = vfs;

    let { addImage, addText, imageData, makePDF } = this;
    let { userCompany } = this.props.data;
    let d = new Date();
    let month = monthNames[d.getMonth()];
    let year = d.getUTCFullYear();
    let addFrontPage = addImage.bind(null, "frontPage", imageData);
    let addOne = addImage.bind(null, "sectionOne", imageData);
    let addTwo = addImage.bind(null, "sectionTwo", imageData);
    let addThree = addImage.bind(null, "sectionThree", imageData);
    let addFour = addImage.bind(null, "sectionFour", imageData);
    let addFive = addImage.bind(null, "sectionFive", imageData);
    let addSix = addImage.bind(null, "sectionSix", imageData);
    let addSeven = addImage.bind(null, "sectionSeven", imageData);
    let addEight = addImage.bind(null, "sectionEight", imageData);

    let addContent = compose(
      addEight,
      addSeven,
      addSix,
      addFive,
      addFour,
      addThree,
      addTwo,
      addOne,
      addFrontPage
    );
    pdfContent.forEach(addContent);
    makePDF(pdfContent);
  };

  makePDF = content => {
    let {
      data: { userName },
      errorHandler,
      pdfCompleteFunc
    } = this.props;
    let date = new Date();
    let currentDate = date.toLocaleDateString(languageCode, dateOptions);
    pdfMake
      .createPdf({ content, styles: pdfStyles })
      .download(`${pdfTitle}(${currentDate})`, e => {
        if (pdfCompleteFunc) {
          pdfCompleteFunc();
        }
      });
  };

  addImage = (prop, arr, o) => {
    if (this.hasProp(o, "image")) {
      let regEx = new RegExp(`${prop}`, "g");
      if (regEx.test(o.image)) {
        let img = getObjectByProp(prop, "id", arr);
        o.image =
          img != null && this.hasProp(img, "base64img") ? img.base64img : null;
      }
    }
    return o;
  };

  addText = (prop, text, o) => {
    if (this.hasProp(o, "text")) {
      text = text != null && text.length > 0 ? text : "No Information Provided";
      o.text = o.text.replace(
        new RegExp(prop, "g"),
        match => (match ? `${text}` : match)
      );
    }
    return o;
  };

  hasProp = (o, prop) => {
    return o.hasOwnProperty(prop);
  };

  getNodeBounds = node => {
    if (node.getBoundingClientRect) {
      var clientRect = node.getBoundingClientRect();
      var width =
        node.offsetWidth == null ? clientRect.width : node.offsetWidth;
      return {
        top: Math.floor(clientRect.top),
        bottom: Math.floor(
          clientRect.bottom || clientRect.top + clientRect.height
        ),
        right: Math.floor(clientRect.left + width),
        left: Math.floor(clientRect.left),
        width: width,
        height:
          node.offsetHeight == null ? clientRect.height : node.offsetHeight
      };
    }
    return {};
  };
  encodeToBase64 = async ref => {
    let bounds = this.getNodeBounds(ref);

    return await HTML2Canvas(ref, {
      logging: true,
      profile: true,
      useCORS: true,
      width: 1200,
      height: 1500
    }).then(function(canvas) {
      return {
        base64img: canvas.toDataURL("image/png"),
        id: ref.id
      };
    });
  };

  render() {
    let { data } = this.props;
    let { component, showImages } = this.state;
    let { renderImages, imageData, setSection, sectionOne, sectionTwo } = this;
    let {
      userName = "Not provided",
      userCompany = "Not provided",
      userType,
      percentCompleted
    } = data;
    let currentYear = new Date().getFullYear();
    return (
      <PDFSourceContainer>
        <div id="frontPage" ref={setSection}>
          <FPTitle>{`Company Name : ${userCompany}`}</FPTitle>
          <FPTitle>{`Completed By : ${userName}`}</FPTitle>
          <FPTitle>{`Survey is ${percentCompleted} Completed`}</FPTitle>
          <FPTitle>{`Year: ${currentYear}`}</FPTitle>
        </div>
        <div id="sectionOne" ref={setSection}>
          <Title>{tjTitle}</Title>
          <PDFGenerator.TransitionCurveComponent data={data} />
          <HDivider />
          <Title>{tmiTitle}</Title>
          <PDFGenerator.BenchmarkChart data={data} />
          <HDivider />
          <Title>{tmTitle}</Title>
          <Label>{ALIGN}</Label>
          <PDFGenerator.AvgRatingSection data={data} name={ALIGN} />
          <HDivider />
          <Label>{LISTEN}</Label>
          <PDFGenerator.AvgRatingSection data={data} name={LISTEN} />
        </div>
        <div id="sectionTwo" ref={setSection}>
          <Label>{ENGAGE}</Label>
          <PDFGenerator.AvgRatingSection data={data} name={ENGAGE} />
          <HDivider />
          <Label>{ENABLE}</Label>
          <PDFGenerator.AvgRatingSection data={data} name={ENABLE} />
          <HDivider />
          <Label>{IMPROVE}</Label>
          <PDFGenerator.AvgRatingSection data={data} name={IMPROVE} />
          <HDivider />
          <Label>{INFLUENCE}</Label>
          <PDFGenerator.AvgRatingSection data={data} name={INFLUENCE} />
          <HDivider />
          <PDFGenerator.Lists data={data} />
        </div>
        <div>
          {userType === premium && (
            <div>
              <div id="sectionThree" ref={setSection}>
                <Label>{dgTitle}</Label>
                <Label>{ALIGN}</Label>
                <PDFGenerator.ScoreDisplay data={data} workstream={ALIGN} />
                <HDivider />
                <Label>{ctTitle}</Label>
                <PDFGenerator.DivergenceChart data={data} workstream={ALIGN} />
              </div>
              <div id="sectionFour" ref={setSection}>
                <Label>{dgTitle}</Label>
                <Label>{LISTEN}</Label>
                <PDFGenerator.ScoreDisplay data={data} workstream={LISTEN} />
                <HDivider />
                <Label>{ctTitle}</Label>
                <PDFGenerator.DivergenceChart data={data} workstream={LISTEN} />
              </div>
              <div id="sectionFive" ref={setSection}>
                <Label>{dgTitle}</Label>
                <Label>{ENGAGE}</Label>
                <PDFGenerator.ScoreDisplay data={data} workstream={ENGAGE} />
                <HDivider />
                <Label>{ctTitle}</Label>
                <PDFGenerator.DivergenceChart data={data} workstream={ENGAGE} />
              </div>
              <div id="sectionSix" ref={setSection}>
                <Label>{dgTitle}</Label>
                <Label>{ENABLE}</Label>
                <PDFGenerator.ScoreDisplay data={data} workstream={ENABLE} />
                <HDivider />
                <Label>{ctTitle}</Label>
                <PDFGenerator.DivergenceChart data={data} workstream={ENABLE} />
              </div>
              <div id="sectionSeven" ref={setSection}>
                <Label>{dgTitle}</Label>
                <Label>{IMPROVE}</Label>
                <PDFGenerator.ScoreDisplay data={data} workstream={IMPROVE} />
                <HDivider />
                <Label>{ctTitle}</Label>
                <PDFGenerator.DivergenceChart
                  data={data}
                  workstream={IMPROVE}
                />
              </div>
              <div id="sectionEight" ref={setSection}>
                <Label>{dgTitle}</Label>
                <Label>{INFLUENCE}</Label>
                <PDFGenerator.ScoreDisplay data={data} workstream={INFLUENCE} />
                <HDivider />
                <Label>{ctTitle}</Label>
                <PDFGenerator.DivergenceChart
                  data={data}
                  workstream={INFLUENCE}
                />
              </div>
            </div>
          )}
        </div>
      </PDFSourceContainer>
    );
  }
}

export default PDFGenerator;
