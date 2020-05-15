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

  return moment(date).format(`DD MMMM YYYY`);
};

const getDuration = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  let hours = duration.hours();
  let mins = duration.minutes();

  hours = hours > 0 ? `${hours}h` : ``;
  mins = mins > 0 ? `${mins}m` : ``;

  if (hours && mins) {
    hours += ` `;
  }
  return hours + mins;
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
  getRelativeDate,
  getDuration
};
