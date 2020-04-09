import moment from 'moment';

const getDate = (date) => {
  if (!date) {
    return ``;
  }

  return moment(date).format(`D MMMM`);
};

const getFullDate = (date) => {
  if (!date) {
    return ``;
  }

  return moment(date).format(`D MMMM YYYY`);
};

const getRelativeDate = (date) => {
  if (!date) {
    return ``;
  }

  return moment(date).fromNow();
};

export {
  getDate,
  getFullDate,
  getRelativeDate
};
