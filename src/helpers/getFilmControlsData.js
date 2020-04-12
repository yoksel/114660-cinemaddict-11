const controlsData = {
  watchlist: {
    key: `isInWatchList`,
    getVariants(value) {
      if (value) {
        return `Already in watchlist`;
      }
      return `Add to watchlist`;
    }
  },
  watched: {
    key: `isWatched`,
    getVariants(value) {
      if (value) {
        return `Already watched`;
      }
      return `Mark as watched`;
    }
  },
  favorite: {
    key: `isFavorite`,
    getVariants(value) {
      if (value) {
        return `Already in favorites`;
      }
      return `Add to favorites`;
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
        text,
        isActive
      };
    });
};
