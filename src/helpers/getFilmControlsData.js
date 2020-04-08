const controlsData = {
  watchlist: {
    key: `isInWatchList`,
    variants: {
      'no': `Add to watchlist`,
      'yes': `Already in watchlist`,
    }
  },
  watched: {
    key: `isWatched`,
    variants: {
      'no': `Mark as watched`,
      'yes': `Already watched`,
    }
  },
  favorite: {
    key: `isFavorite`,
    variants: {
      'no': `Add to favorites`,
      'yes': `Already in favorites`,
    }
  },
};

export const getFilmControlsData = (data) => {
  return Object.entries(controlsData)
    .map(([id, controlData]) => {
      const {key, variants} = controlData;
      const isActive = data[key];
      const text = isActive ? variants.yes : variants.no;

      return {
        id,
        text,
        isActive
      };
    });
};
