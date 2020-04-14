import moment from 'moment';

const getDate = (date) => {
  if (!date || !(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`D MMMM`);
};

const getFullDate = (date) => {
  if (!date || !(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`D MMMM YYYY`);
};

const getRelativeDate = (date) => {
  if (!date || !(date instanceof Date)) {
    return ``;
  }

  return moment(date).fromNow();
};

export {
  getDate,
  getFullDate,
  getRelativeDate
};
