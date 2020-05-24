import {sortNumbersByAsc, shuffle} from '.';
import {MAX_CARDS_TOP, SortType} from '../constants';

const getValueGetter = (propName) => {
  switch (propName) {
    case SortType.COMMENTS:
      return (value) => value.length;
    default:
      return (value) => value;
  }
};

const getGroupsByProp = (items, propName) => {
  const getValue = getValueGetter(propName);

  return items.reduce((prev, item) => {
    const propValue = getValue(item[propName]);

    if (!prev[propValue]) {
      prev[propValue] = [];
    }

    prev[propValue].push(item);
    return prev;
  }, {});
};

const keysToNumbers = (keys) => {
  return keys.reduce((prev, key) => {
    const num = Number(key);

    if (!isNaN(num)) {
      prev.push(num);
    }

    return prev;
  }, []);
};

const getKeysSortedByAsc = (keys) => {
  keys = keysToNumbers(keys);
  keys.sort(sortNumbersByAsc);

  return keys;
};

export const getRandomItemsFromTop = (films, propName, quantity = MAX_CARDS_TOP) => {
  const groupsByProp = getGroupsByProp(films, propName);
  const sortedKeys = getKeysSortedByAsc(Object.keys(groupsByProp));

  let topFilms = groupsByProp[sortedKeys.pop()];

  if (topFilms.length < quantity) {
    while (topFilms.length < quantity) {
      topFilms = topFilms.concat(groupsByProp[sortedKeys.pop()]);
    }

    return topFilms.slice(0, quantity);
  }

  const topFilmsShuffled = shuffle(topFilms);
  return topFilmsShuffled.slice(0, quantity);
};
