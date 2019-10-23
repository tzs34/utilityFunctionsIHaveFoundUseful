import Copy from "../../copy";

const {
  pdfImg,
  logoBase64,
  colors: { barChartColors },
  labels: { userRow, benchmarkRow, avgRow },
  template: { _logo, _header, _companyName, _currentDate, _tcurve, _averages }
} = Copy;

const pdfStyles = {
  base: {
    fontSize: 12
  },
  spacer: {
    lineHeight: 1.4
  },
  italic: {
    itlaic: true
  },
  center: {
    alignment: "center"
  },
  right: {
    alignment: "right"
  },
  left: {
    alignment: "left"
  },
  margin5: {
    margin: [5, 5, 5, 5]
  },
  marginTp40: {
    marginTop: 40
  },
  marginTp20: {
    marginTop: 20
  },
  font20: {
    fontSize: 20,
    lineHeight: 1.5
  },
  font16: {
    fontSize: 16,
    lineHeight: 1.3
  },
  font8: {
    fontSize: 8,
    lineHeight: 1
  },
  font14: {
    fontSize: 14,
    lineHeight: 1.4
  },
  font12: {
    fontSize: 12,
    lineHeight: 1.4
  },
  subHeader: {
    fontSize: 7,
    lineHeight: 1.4
  },
  eatable: {
    fontSize: 10
  }
};

const pdfContent = [
  {
    image: `${logoBase64}`,
    style: ["left"],
    fit: [100, 200],
    absolutePosition: { x: 10, y: 10 }
  },
  {
    image: `${pdfImg}`,
    style: ["center"],
    fit: [500, 500],
    absolutePosition: { x: 10, y: 120 }
  },
  {
    image: "frontPage",
    style: ["center"],
    fit: [800, 400],
    absolutePosition: { x: 10, y: 500 }
  },
  {
    text:
      "All content © 2018 Towards Maturity CIC Ltd. Not to be distributed or copied",
    style: ["font8", "margin20"],
    absolutePosition: { x: 250, y: 790 }
  },
  {
    image: `${logoBase64}`,
    style: ["left"],
    fit: [100, 200],
    absolutePosition: { x: 10, y: 10 },
    pageBreak: "before"
  },
  {
    text: "Health Check Dashboard\n\n",
    style: ["font16", "margin20"],
    absolutePosition: { x: 200, y: 10 }
  },
  {
    image: "sectionOne",
    style: ["center"],
    fit: [800, 600],
    absolutePosition: { x: 10, y: 80 }
  },
  {
    image: `${logoBase64}`,
    style: ["left"],
    fit: [100, 200],
    absolutePosition: { x: 10, y: 10 },
    pageBreak: "before"
  },
  {
    text: "Health Check Dashboard\n\n",
    style: ["font16", "margin20"],
    absolutePosition: { x: 200, y: 10 }
  },
  {
    image: "sectionTwo",
    style: ["center"],
    fit: [800, 700],
    absolutePosition: { x: 10, y: 100 }
  },
  {
    image: `${logoBase64}`,
    style: ["left"],
    fit: [100, 200],
    absolutePosition: { x: 10, y: 10 },
    pageBreak: "before"
  },
  {
    text: "Health Check Dashboard\n\n",
    style: ["font16", "margin20"],
    absolutePosition: { x: 200, y: 10 }
  },
  {
    image: "sectionThree",
    style: ["center"],
    fit: [800, 700],
    absolutePosition: { x: 10, y: 100 }
  },
  {
    text: "Strategic alignment\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 460 }
  },
  {
    text:
      "A clear vision is critical if you are to target your resources effectively but if your vision is to take off it is important that it is shared and endorsed by top managers and leaders. Keep your strategy flexible so you are able to adapt to change.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 500 }
  },
  {
    text: "Business alignment\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 580 }
  },
  {
    text:
      "Business alignment is important at all levels of your implementation. Successful organisations are more likely to take steps to ensure that their learning interventions are relevant to improving the performance of individuals and teams that they are supporting. It is easier to engage staff and managers when there is a clear link to their current (or future) functions and having a clear understanding of outcomes will help you demonstrate value.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 620 }
  },
  {
    image: `${logoBase64}`,
    style: ["left"],
    fit: [100, 200],
    absolutePosition: { x: 10, y: 10 },
    pageBreak: "before"
  },
  {
    text: "Health Check Dashboard\n\n",
    style: ["font16", "margin20"],
    absolutePosition: { x: 200, y: 10 }
  },
  {
    image: "sectionFour",
    style: ["center"],
    fit: [800, 700],
    absolutePosition: { x: 10, y: 100 }
  },
  {
    text: "Individual choice\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 490 }
  },
  {
    text:
      "When it comes to learning technologies, it is important to address their needs. Providing learners with more real choices encourages them to take responsibility for their own development. Learner choice recognises what staff need to build the skills they need, they find out for themselves rather than from formal learning interventions. Addressing choice is the first step to moving towards an embedded learning culture.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 540 }
  },
  {
    text: "Individual motivation\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 660 }
  },
  {
    text:
      "Research has shown that learners are more motivated when the learning is directly relevant to their current or future jobs.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 690 }
  },
  {
    image: `${logoBase64}`,
    style: ["left"],
    fit: [100, 200],
    absolutePosition: { x: 10, y: 10 },
    pageBreak: "before"
  },
  {
    text: "Health Check Dashboard\n\n",
    style: ["font16", "margin20"],
    absolutePosition: { x: 200, y: 10 }
  },
  {
    image: "sectionFive",
    style: ["center"],
    fit: [800, 700],
    absolutePosition: { x: 10, y: 100 }
  },
  {
    text: "Implementing change\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 520 }
  },
  {
    text:
      "Managing change and engaging your header stakeholders is a critical component of success but is often neglected. There are a number of elements to consider across the process.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 570 }
  },
  {
    text: "Empowering individuals\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 630 }
  },
  {
    text:
      "Empowered learners are more engaged, more motivated and more self-directed. Learners that organise their own personal learning strategies are more likely to be self-reliant and need less prompting to learn online.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 670 }
  },
  {
    text: "Engaging trainers\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 50 },
    pageBreak: "before"
  },
  {
    text:
      "Classroom training staff often have the most face-to-face contact with learners, and the dedicated time set aside to develop specific knowledge and skills. Extending this contact beyond the classroom through pre- and post-class activities and discussion and supporting practical on-the-job tasks will improve the application of learning.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 100 }
  },
  {
    text: "Involving leaders\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 200 }
  },
  {
    text:
      "Gaining the commitment of senior business leaders helps embed learning in the organisational culture. Through modelling learning innovation in their own leadership and management programmes, and equipping line managers with the resources to support their teams, managers will be a positive influence on learning and champion digital solutions.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 250 }
  },
  {
    image: `${logoBase64}`,
    style: ["left"],
    fit: [100, 200],
    absolutePosition: { x: 10, y: 10 },
    pageBreak: "before"
  },
  {
    text: "Health Check Dashboard\n\n",
    style: ["font16", "margin20"],
    absolutePosition: { x: 200, y: 10 }
  },
  {
    image: "sectionSix",
    style: ["center"],
    fit: [800, 700],
    absolutePosition: { x: 10, y: 100 }
  },
  {
    text: "Learning and development essentials\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 580 }
  },
  {
    text:
      "You may introduce some specialist roles linked to learning technologies, but your learning professionals are typically at the front line of business engagement. These individuals need to understand the opportunities represented by technology and how to manage external suppliers effectively, whether they sit within a central L&D department or in the line of business. Building awareness and skills builds confidence and contributes to results.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 620 }
  },
  {
    text: "Designing learning\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 50 },
    pageBreak: "before"
  },
  {
    text:
      "Good formal learning design contributes to staff engagement and performance improvement whether it is for stand-alone content or a collaborative intervention. It is important to keep up to date with the latest thinking and research & be able to apply ideas in practical ways within your teams.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 90 }
  },
  {
    text: "Transferring learning\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 170 }
  },
  {
    text:
      "Transferring learning often starts with the basic testing and record keeping associated with compliance training through to the way that technology is used to tailor learner pathways and simulate the work environment to improve performance.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 210 }
  },
  {
    text: "Supporting performance\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 290 }
  },
  {
    text:
      "Within formal learning, learner support is important throughout the process. Up front, it is important that staff know they are doing the right course at the right time for them to ensure that they have a positive experience. Support is also important during the programme and after to encourage application of new skills back in the workplace.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 340 }
  },
  {
    text: "Facilitating collaboration\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 440 }
  },
  {
    text:
      "One of the outstanding characteristics of top quartile organisations is their use of technology to encourage information sharing and collaboration within the business. In effect they are harnessing collective knowledge by making it easier for their staff to learn from each other in order to become more effective.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 470 }
  },
  {
    image: `${logoBase64}`,
    style: ["left"],
    fit: [100, 200],
    absolutePosition: { x: 10, y: 10 },
    pageBreak: "before"
  },
  {
    text: "Health Check Dashboard\n\n",
    style: ["font16", "margin20"],
    absolutePosition: { x: 200, y: 10 }
  },
  {
    image: "sectionSeven",
    style: ["center"],
    fit: [800, 700],
    absolutePosition: { x: 10, y: 100 }
  },
  {
    text: "Gathering feedback\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 520 }
  },
  {
    text:
      "Setting targets in partnership with senior management is just the first stage. Plans need to be made for how these targets will be met and what data will need to be gathered to measure programme effectiveness against these business targets. Learning analytics and benchmarking can help.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 560 }
  },
  {
    text: "Communicating success\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 640 }
  },
  {
    text:
      "When senior managers, line managers and supervisors understand the impact of learning on performance and see how learning programmes are helping the business to meet its targets they will drive the learning culture in the organisation.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 680 }
  },
  {
    image: `${logoBase64}`,
    style: ["left"],
    fit: [100, 200],
    absolutePosition: { x: 10, y: 10 },
    pageBreak: "before"
  },
  {
    text: "Health Check Dashboard\n\n",
    style: ["font16", "margin20"],
    absolutePosition: { x: 200, y: 10 }
  },
  {
    image: "sectionEight",
    style: ["center"],
    fit: [800, 700],
    absolutePosition: { x: 10, y: 100 }
  },
  {
    text: "Talent Management\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 520 }
  },
  {
    text:
      "Aligning to talent strategies such as recruitment, succession planning and performance can really influence success.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 550 }
  },
  {
    text: "Business environment\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 620 }
  },
  {
    text:
      "Understanding and leveraging your wider business environment is the basic prerequisite for providing a service to your business. It influences the time, place and quality of the service you provide.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 660 }
  },
  {
    text: "Work culture\n\n",
    style: ["font14", "margin20"],
    absolutePosition: { x: 10, y: 50 },
    pageBreak: "before"
  },
  {
    text:
      "When it comes to engaging with innovative learning techniques, 55% of staff say that their line manager's opinion is most influential. Successful organisations support line managers to help them support their staff.\n",
    style: ["font12", "margin20"],
    absolutePosition: { x: 10, y: 100 }
  }
];

export { pdfContent, pdfStyles };
