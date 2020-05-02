import {SortType} from '../constants';

export const sortByRating = (a, b) => {
  return b.rating - a.rating;
};

export const sortByDate = (a, b) => {
  return b.releaseDate - a.releaseDate;
};

export const sortByComments = (a, b) => {
  return b.comments.length - a.comments.length;
};

export const getFilmsSortedByProp = (filmsToSort, prop) => {
  const films = filmsToSort.slice();

  switch (prop) {
    case SortType.RATING:
      return films.sort(sortByRating);
    case SortType.DATE:
      return films.sort(sortByDate);
    case SortType.COMMENTS:
      return films.sort(sortByComments);
    default:
      return films;
  }
};
