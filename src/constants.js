const EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const USER_STATUSES = [
  {
    min: 21,
    name: `Movie buff`
  },
  {
    min: 11,
    name: `Fan`,
  },
  {
    min: 1,
    name: `Novice`,
  },
];

const AGE_RATINGS = {
  '0+': `General audiences`,
  '6+': `Parental guidance`,
  '12+': `Parents strongly cautioned`,
  '16+': `Restricted`,
  '18+': `No One 17 & Under Admitted`,
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

const FILTERS = {
  [FilterType.ALL]: {
    name: `All movies`
  },
  [FilterType.WATCHLIST]: {
    propName: `isInWatchList`,
    name: `Watchlist`
  },
  [FilterType.HISTORY]: {
    propName: `isWatched`,
    name: `History`
  },
  [FilterType.FAVORITES]: {
    propName: `isFavorite`,
    name: `Favorites`
  },
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `raiting`,
  COMMENTS: `comments`
};

const StatsFilter = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

const MAX_CARDS_TOP = 2;
const MAX_CARDS_SHOW = 5;
const MAX_CARDS_LOAD = 5;

export {
  EMOJIS,
  USER_STATUSES,
  AGE_RATINGS,
  FilterType,
  FILTERS,
  SortType,
  StatsFilter,
  MAX_CARDS_TOP,
  MAX_CARDS_SHOW,
  MAX_CARDS_LOAD,
};
