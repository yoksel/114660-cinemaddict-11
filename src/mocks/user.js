import {USER_STATUSES} from '../const.js';

export const getUserData = (data) => {
  const watched = data.filter((item) => item.isWatched);
  const quantity = watched.length;
  let status = ``;

  for (let statusData of USER_STATUSES) {
    const {min, max, name} = statusData;

    if (quantity >= min && quantity <= max) {
      status = name;
      break;
    }
  }

  return {
    status,
    avatar: `bitmap@2x.png`
  };
};
