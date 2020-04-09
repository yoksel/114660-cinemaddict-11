import {USER_STATUSES} from '../const.js';

const getTotalDuration = (watched) => {
  const totalTimeMins = watched.reduce((prev, {runtime}) => {
    return prev + runtime.hours * 60 + runtime.mins;
  }, 0);

  const mins = totalTimeMins % 60;
  const hours = (totalTimeMins - mins) / 60;

  return {hours, mins};
};

const getTopGenre = (watched) => {
  if (watched.length === 0) {
    return `None`;
  }

  const countGenres = watched.reduce((prev, {genres}) => {
    for (const genre of genres) {
      if (!prev[genre]) {
        prev[genre] = 0;
      }

      prev[genre]++;
    }
    return prev;
  }, {});

  const genresList = Object.entries(countGenres);

  genresList.sort((a, b) => {
    return b[1] - a[1];
  });

  return genresList[0][0];
};

export const getUserData = (data) => {
  const watched = data.filter((item) => item.isWatched);
  const watchedQuantity = watched.length;
  const watchedDuration = getTotalDuration(watched);
  const topGenre = getTopGenre(watched);
  let status = ``;

  for (let statusData of USER_STATUSES) {
    const {min, max, name} = statusData;

    if (watchedQuantity >= min && watchedQuantity <= max) {
      status = name;
      break;
    }
  }

  return {
    status,
    avatar: `bitmap@2x.png`,
    watchedQuantity,
    watchedDuration,
    topGenre
  };
};
