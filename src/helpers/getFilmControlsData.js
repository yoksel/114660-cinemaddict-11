import {FilterType, FILTERS} from '../constants';

const controlsData = {
  watchlist: {
    key: FILTERS[FilterType.WATCHLIST].propName,
    getVariants(value) {
      return value ? `Already in watchlist` : `Add to watchlist`;
    }
  },
  watched: {
    key: FILTERS[FilterType.HISTORY].propName,
    getVariants(value) {
      return value ? `Already watched` : `Mark as watched`;
    }
  },
  favorite: {
    key: FILTERS[FilterType.FAVORITES].propName,
    getVariants(value) {
      return value ? `Already in favorites` : `Add to favorites`;
    }
  },
};

export const getFilmControlsData = (data) => {
  return Object.entries(controlsData)
    .map(([id, controlData]) => {
      const {key, getVariants} = controlData;
      const isActive = data[key];
      const text = getVariants(isActive);

      return {
        id,
        key,
        text,
        isActive
      };
    });
};
