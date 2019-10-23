const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const uppercaseSplit = str => {
  return str.replace(
    /(^[a-z]+)|[0-9]+|[A-Z][a-z]+|[A-Z]+(?=[A-Z][a-z]|[0-9])/g,
    (match, first) => {
      if (first) {
        match = match[0].toUpperCase() + match.substr(1);
      }
      return match + " ";
    }
  );
};

const parseUrl = (area, url) => {
  return url.replace(":", `:${area}`).replace(/\s/g, "+");
};

const insertIntoArray = (arr, index, ...newItems) => [
  ...arr.slice(0, index),
  ...newItems,
  ...arr.slice(index)
];

const containsObject = (value, prop, arr) =>
  arr.findIndex(o => o[prop] === value);

const getObjectByProp = (value, prop, arr) => {
  let ind = containsObject(value, prop, arr);
  if (ind >= 0) {
    return arr[ind];
  }
  return null;
};

const jsonToCSV = (config = {}, data = [], fn) => {
  let result, ctr, keys, columnDelimiter, lineDelimiter;

  if (!data.length) return null;

  columnDelimiter = config.columnDelimiter || ",";
  lineDelimiter = config.lineDelimiter || "\n";

  keys = fn != null ? Object.keys(fn(data[0])) : Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item, index) {
    if (fn && index > 0) {
      fn(item);
    }
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

const blobSupported = () => window.Blob;

const msSaveOrOpenBlobSupported = () => window.navigator.msSaveOrOpenBlob;

const versionIE = () => {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
};

const removePropByKey = (key, object) => {
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
};

const removePropByRegex = (rgx, key, obj) =>
  rgx.test(key) ? obj : delete obj[key];

const cleanString = input =>
  input
    ? input
        .split("")
        .map(char => (char.charCodeAt(0) <= 127 ? char : ""))
        .join("")
    : "";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const formatDateTime = (label, date) => {
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let secs = date.getSeconds();
  let mn = monthNames[monthIndex];
  return `${label} ${day} ${mn} ${year} :: ${hours} : ${minutes} : ${secs}`;
};

function convertTimestampToDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

function roundToOne(num) {
  return +(Math.round(num + "e+1") + "e-1");
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const addOneDPZero = number => {
  var value = Number(number);

  var res = String(number).split(".");
  // If there is no decimal point or only one decimal place found.
  if (res.length <= 1) {
    // Set the number to zeros decimal places
    value = value.toFixed(1);
  }
  if (res[1] && res[1].length > 1) {
    value = roundToOne(value).toFixed(1);
  }
  // Return updated or original number.
  return value;
};

const addTwoDPZero = number => {
  var value = Number(number);

  var res = String(number).split(".");

  if (res.length === 1) {
    value = value.toFixed(2);
  }
  // If there is no decimal point or only one decimal place found.
  if (res[1] && res[1].length <= 1) {
    // Set the number to zeros decimal places
    value = value.toFixed(2);
  }
  if (res[1] && res[1].length > 2) {
    value = roundToTwo(value).toFixed(2);
  }
  // Return updated or original number.
  return value;
};

const removeInvalidChars = str => str.replace(/\uFFFD/g, "");
const round = number => Math.round(number * 10) / 10;

const isEmptyObj = obj => Object.keys(obj).length === 0;

export {
  compose,
  uppercaseSplit,
  parseUrl,
  insertIntoArray,
  formatDateTime,
  addOneDPZero,
  addTwoDPZero,
  removeInvalidChars,
  containsObject,
  getObjectByProp,
  monthNames,
  round,
  roundToTwo,
  jsonToCSV,
  blobSupported,
  msSaveOrOpenBlobSupported,
  convertTimestampToDate,
  isEmptyObj
};
