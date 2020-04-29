import {FilterType, FILTERS} from '../constants';

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
    case FilterType.HISTORY:
    case FilterType.FAVORITES:
      return films.filter((item) => item[FILTERS[filterType].prop]);
  }

  return films;
};
