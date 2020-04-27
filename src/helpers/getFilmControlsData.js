const controlsData = {
  watchlist: {
    key: `isInWatchList`,
    getVariants(value) {
      return value ? `Already in watchlist` : `Add to watchlist`;
    }
  },
  watched: {
    key: `isWatched`,
    getVariants(value) {
      return value ? `Already watched` : `Mark as watched`;
    }
  },
  favorite: {
    key: `isFavorite`,
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
