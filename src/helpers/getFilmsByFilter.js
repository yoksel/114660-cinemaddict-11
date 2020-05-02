import {FilterType, FILTERS} from '../constants';

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    default:
      return films.filter((item) => item[FILTERS[filterType].prop]);
  }
};
