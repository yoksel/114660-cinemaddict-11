import {sortNumbersByAsc, shuffle} from '.';

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

export const getRandomItemsFromTop = (films, propName, quantity) => {
  const groupByPropValue = getGroupsByProp(films, propName);

  const sortedKeys = Object.keys(groupByPropValue);
  sortedKeys.sort(sortNumbersByAsc);

  let topFilms = groupByPropValue[sortedKeys.pop()];

  if (topFilms.length < quantity) {
    while (topFilms.length < quantity) {
      topFilms = topFilms.concat(groupByPropValue[sortedKeys.pop()]);
    }

    return topFilms;
  }

  topFilms.sort(shuffle);
  return topFilms.slice(0, quantity);
};
