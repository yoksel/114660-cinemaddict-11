import { FilterType, FILTERS } from '../../constants';

const controlsData = {
  [FilterType.WATCHLIST]: {
    key: FILTERS[FilterType.WATCHLIST].propName,
    getVariants(value) {
      return value ? `Already in watchlist` : `Add to watchlist`;
    }
  },
  [FilterType.HISTORY]: {
    key: FILTERS[FilterType.HISTORY].propName,
    getVariants(value) {
      return value ? `Already watched` : `Mark as watched`;
    }
  },
  [FilterType.FAVORITES]: {
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
