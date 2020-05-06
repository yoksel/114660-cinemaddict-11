import {getRandomID} from '../helpers';
import {EMOJIS, AGE_RATINGS} from '../constants';
import {POSTERS, TITLES, SENTENCES, GENRES, NAMES, COUNTRIES} from './constants';

const DESC_LENGTH = 140;

const WATCHED_RANDOM_DATE_PARAMS = {
  yearsOffset: 2,
  monthsOffset: 3,
  daysOffset: 3
};

const RANDOM_COMMENTS_DATE_PARAMS = {yearsOffset: 5};

const DEFAULT_YEARS_OFFSET = 30;
const DEFAULT_MONTHS_OFFSET = 12;
const DEFAULT_DAYS_OFFSET = 31;

const getRandomItem = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const getDesc = () => {
  const min = 1;
  const max = SENTENCES.length - 1;
  const quantity = Math.floor(Math.random() * max) + min;
  let desc = ``;

  for (let i = 0; i < quantity; i++) {
    desc += getRandomItem(SENTENCES);
  }

  return desc;
};

const getRandomDuration = () => {
  const hours = Math.floor(Math.random() * 2) + 1;
  const mins = Math.floor(Math.random() * 60);
  return {
    hours,
    mins
  };
};

const getRandomRating = () => {
  const rating = Math.random() * 10;

  return +rating.toFixed(1);
};

const getRandomNum = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomDate = (params = {}) => {
  const {yearsOffset = DEFAULT_YEARS_OFFSET,
    monthsOffset = DEFAULT_MONTHS_OFFSET,
    daysOffset = DEFAULT_DAYS_OFFSET} = params;
  const now = new Date();

  now.setDate(now.getDate() - getRandomNum(daysOffset));
  now.setMonth(now.getMonth() - getRandomNum(monthsOffset));
  now.setFullYear(now.getFullYear() - getRandomNum(yearsOffset));

  return now;
};

const getRandomComments = () => {
  const quantity = Math.floor(Math.random() * 5);
  const list = [];

  for (let i = 0; i < quantity; i++) {
    const id = getRandomID();
    const author = getRandomItem(NAMES);
    const text = getRandomItem(SENTENCES);
    const date = getRandomDate(RANDOM_COMMENTS_DATE_PARAMS);
    const emoji = getRandomItem(EMOJIS);

    list.push({
      id,
      author,
      text,
      emoji,
      date,
    });
  }

  return list;
};

const getShortDesc = (desc) => {
  if (desc.length <= DESC_LENGTH) {
    return desc;
  }

  desc = desc
    .substr(0, DESC_LENGTH - 1)
    .trim()
    .replace(/,$/g, ``);

  return `${desc}&hellip;`;
};

const getRandomList = (list, min, max) => {
  const quantity = Math.floor(Math.random() * (max - min)) + min;
  const newList = new Set();

  while (newList.size < quantity) {
    newList.add(getRandomItem(list));
  }

  return Array.from(newList);
};

const getCardsData = (quantity) => {
  const data = [];

  for (let i = 0; i < quantity; i++) {
    const id = getRandomID();
    const poster = getRandomItem(POSTERS);
    const title = getRandomItem(TITLES);
    const origTitle = getRandomItem(TITLES);
    const desc = getDesc();
    const shortDesc = getShortDesc(desc);
    const genres = getRandomList(GENRES, 1, 3);
    const releaseDate = getRandomDate();
    const runtime = getRandomDuration();
    const rating = getRandomRating();
    const comments = getRandomComments();
    const isInWatchList = Math.random() > 0.5;
    const isWatched = Math.random() > 0.5;
    const isFavorite = Math.random() > 0.5;
    const watchedDate = isWatched ? getRandomDate(WATCHED_RANDOM_DATE_PARAMS) : null;
    const ageRating = getRandomItem(Object.keys(AGE_RATINGS));
    const country = getRandomItem(COUNTRIES);
    const director = getRandomItem(NAMES);
    const writers = getRandomList(NAMES, 2, 5);
    const actors = getRandomList(NAMES, 5, 10);

    data.push({
      id,
      poster,
      title,
      origTitle,
      desc,
      shortDesc,
      genres,
      releaseDate,
      runtime,
      rating,
      ageRating,
      comments,
      country,
      director,
      writers,
      actors,
      isInWatchList,
      isWatched,
      isFavorite,
      watchedDate
    });
  }

  return data;
};

export {getCardsData};
