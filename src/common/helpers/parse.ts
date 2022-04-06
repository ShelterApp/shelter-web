import * as _ from "lodash";

export const parseURL = url => {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url;
  }
  return `http://${url}`;
};

export const removeEmptyObject = obj => {
  const object = { ...obj };
  Object.keys(object).forEach(key => {
    if (
      object[key] === undefined ||
      object[key] === "undefined" ||
      object[key] === null ||
      object[key] === ""
    ) {
      delete object[key];
    }

    if (
      (key === "filter" || key === "search") &&
      typeof object[key] === "string"
    ) {
      var filter = _.uniq(object[key].split(",").map(x => x.trim())).join(", ");

      // let filterHasValue = [];
      // filter.split(",").map(k => {
      //   if (object[k]) {
      //     filterHasValue.push(k);
      //   }
      // });
      object[key] = filter;
    }
  });
  console.log(object);
  return object;
};

export const parseTime = (date, time) => {
  if (!time)
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      0
    );
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
};
