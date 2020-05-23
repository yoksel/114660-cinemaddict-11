import {sortNumbersByAsc, shuffle} from '.';
import {MAX_CARDS_TOP} from '../constants';

const getGroupsByProp = (items, propName) => {
  return items.reduce((prev, item) => {
    const propValue = Array.isArray(item[propName])
      ? item[propName].length
      : item[propName];

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

  topFilms.sort(shuffle);
  return topFilms.slice(0, quantity);
};
