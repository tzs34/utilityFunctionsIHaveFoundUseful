

 function getProjectNumber(str) {

    return parseInt(str.replace(/PRJ-/, '')) || 0

 }
// Usage : compose functions right to left
// compose(minus8, add10, multiply10)(4) === 42
//
// The resulting function can accept as many arguments as the first function does
// compose(add2, multiply)(4, 10) === 42

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const curry = (fn, ...args1) => {

    return (...args2) => fn(...args1, ...args2)

}

const betterCurry = (fn) => {
  return (...xs) => {
    if (xs.length === 0) {
      throw Error('EMPTY INVOCATION');
    }
    if (xs.length >= fn.length) {
      return fn(...xs);
    }
    return curry(fn.bind(null, ...xs));
  };
}

const stringContains = curry((str, key) => (~key.toLowerCase().indexOf(str)))

const sortByProjectId = (prop, sortAsc, array) => {

        return array.sort((a, b) => {

            let val1 = getProjectNumber(a[prop])
            let val2 = getProjectNumber(b[prop])

            return sortAsc ? val1 - val2 : val2 - val1

        })

}

 const addDays = (d, days) => {

     let newDate = cloneDate(d)
     newDate.setDate(d.getDate() + days)
     return newDate

 }

 const addMonths = (d, months) => {

     let  newDate = cloneDate(d)
     newDate.setMonth(d.getMonth() + months)
     return newDate

 }

 const cloneDate = (d) => {

     return new Date(d.getTime())

 }

const getDaysInMonth = (d) => {

     let resultDate = getFirstDayOfMonth(d)

     resultDate.setMonth(resultDate.getMonth() + 1)
     resultDate.setDate(resultDate.getDate() - 1)

     return resultDate.getDate()

 }

 const getFirstHourOfDay = (d) => {

     return new Date(d.getFullYear(), d.getMonth(), d.getDay(), 0, 0, 0)

 }

const getMiddleOFDay = (d) => {

     return new Date(d.getFullYear(), d.getMonth(), d.getDay(), 12, 0, 0)

 }

 const getFirstDayOfMonth = (d) => {

     return new Date(d.getFullYear(), d.getMonth(), 1)

 }

 const getFullMonth = (d) => {

     let month = d.getMonth()
     switch (month) {

         case 0: return 'January'
         case 1: return 'February'
         case 2: return 'March'
         case 3: return 'April'
         case 4: return 'May'
         case 5: return 'June'
         case 6: return 'July'
         case 7: return 'August'
         case 8: return 'September'
         case 9: return 'October'
         case 10: return 'November'
         case 11: return 'December'

     }

 }

 const getShortMonth = (d) => {

     let month = d.getMonth()
     switch (month) {

         case 0: return 'Jan'
         case 1: return 'Feb'
         case 2: return 'Mar'
         case 3: return 'Apr'
         case 4: return 'May'
         case 5: return 'Jun'
         case 6: return 'Jul'
         case 7: return 'Aug'
         case 8: return 'Sep'
         case 9: return 'Oct'
         case 10: return 'Nov'
         case 11: return 'Dec'

     }

 }

const getDayOfWeek = (d) => {

     let dow = d.getDay()
     switch (dow) {

         case 0: return 'Sunday'
         case 1: return 'Monday'
         case 2: return 'Tuesday'
         case 3: return 'Wednesday'
         case 4: return 'Thursday'
         case 5: return 'Friday'
         case 6: return 'Saturday'

     }

 }

 const getWeekArray = (d) => {

     let dayArray = []
     let daysInMonth = getDaysInMonth(d)
     let daysInWeek
     let emptyDays
     let firstDayOfWeek
     let week
     let weekArray = []
     let i

     for (i = 1; i <= daysInMonth; i++) {

         dayArray.push(new Date(d.getFullYear(), d.getMonth(), i))

     }

     while (dayArray.length) {

         firstDayOfWeek = dayArray[0].getDay()
         daysInWeek = 7 - firstDayOfWeek
         emptyDays = 7 - daysInWeek
         week = dayArray.splice(0, daysInWeek)

         for (i = 0; i < emptyDays; i++) {
             week.unshift(null)
         }

         weekArray.push(week)

     }

     return weekArray

 }

const formatDate = (date) => {

     let m = date.getMonth() + 1
     let d = date.getDate()
     let y = date.getFullYear()
     return d + '/' + m + '/' + y

 }

 const formatTime = (date) => {

     let h = date.getHours()
     let m = date.getMinutes()
     if (m < 10) {

         m = '0' + m

     }

     return h + ':' + m

 }

 const isEqualDate = (d1, d2) => {

     return d1 && d2 &&
         (d1.getFullYear() === d2.getFullYear()) &&
         (d1.getMonth() === d2.getMonth()) &&
         (d1.getDate() === d2.getDate())

 }

 const monthDiff = (d1, d2) => {

     let m
     m = (d1.getFullYear() - d2.getFullYear()) * 12
     m += d1.getMonth()
     m -= d2.getMonth()
     return m

 }

 const keyCodes = {
     DOWN: 40,
     ESC: 27,
     ENTER: 13,
     LEFT: 37,
     RIGHT: 39,
     SPACE: 32,
     TAB: 9,
     UP: 38
 }


 const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const addTwoDPZero = number => {
  let value = Number(number);
  let res = String(number).split(".");

  if (res.length === 1 || res[1].length < 3) {
    value = value.toFixed(2);
  }
  return value;
};

const getCountryCurrency = (balance, code) => {
  let codes = {
    GB: "£"
  };

  let sign = codes[code];
  let amount = addTwoDPZero(balance);

  return `${sign}${amount}`;
};

const memoize = fn => { 
    let cache = {}; 
    return (...args) => { 
      let stringifiedArgs = JSON.stringify(args)
      let result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args)
      return result;
    }
  }

 const deepCopy = (original) => {
    if (Array.isArray(original)) {
      return original.map(elem => deepCopy(elem));
    } else if (typeof original === 'object' && original !== null) {
      return Object.fromEntries(
        Object.entries(original)
          .map(([k, v]) => [k, deepCopy(v)]));
    } else {
      // Primitive value: atomic, no need to copy
      return original;
    }
  }

 export {
    compose,
    curry,
    stringContains,
    sortByProjectId,
    addDays,
    addMonths,
    cloneDate,
    getDaysInMonth,
    getFirstHourOfDay,
    getMiddleOFDay,
    getFirstDayOfMonth,
    getFullMonth,
    getShortMonth,
    getDayOfWeek,
    getWeekArray,
    formatDate,
    formatTime,
    isEqualDate,
    monthDiff,
    keyCodes,
    capitalize, addTwoDPZero, getCountryCurrency, memoize, deepCopy
    }
