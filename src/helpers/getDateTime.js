import {MONTH_NAMES} from '../const.js';

const getDate = (date) => {
  if (!date) {
    return ``;
  }

  const day = date.getDate();
  const monthNum = date.getMonth();

  return `${day} ${MONTH_NAMES[monthNum]}`;
};

const getFullDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${MONTH_NAMES[month]} ${year}`;
};

const getTime = (date) => {
  if (!date) {
    return ``;
  }

  let timeParts = [
    date.getHours(),
    date.getMinutes()
  ];

  return timeParts
    .map((item) => item < 10 ? `0${item}` : item)
    .join(`:`);
};

export {
  getDate,
  getFullDate,
  getTime
};
