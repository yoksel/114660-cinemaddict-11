import {SortType} from '../constants';

export const sortNumbersByAsc = (a, b) => {
  return a - b;
};

export const shuffle = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
};

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
