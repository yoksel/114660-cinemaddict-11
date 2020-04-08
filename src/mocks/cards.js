import {POSTERS, EMOJI, TITLES, SENTENCES, GENRES, NAMES, AGE_RATINGS, COUNTRIES} from '../const.js';

const getRandomItem = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const getDesc = () => {
  const quantity = Math.floor(Math.random() * SENTENCES.length);
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

const getRandomDate = (sizeOffset = `month`) => {
  const now = new Date();
  const offset = Math.floor(Math.random() * 30);

  now.setDate(now.getDate() - offset);

  if (sizeOffset === `years`) {
    now.setFullYear(now.getFullYear() - offset);
  }

  return now;
};

const getRandomComments = () => {
  const quantity = Math.floor(Math.random() * 5);
  const list = [];

  for (let i = 0; i < quantity; i++) {
    const author = getRandomItem(NAMES);
    const text = getRandomItem(SENTENCES);
    const date = getRandomDate();
    const emoji = getRandomItem(EMOJI);

    list.push({
      author,
      text,
      emoji,
      date,
    });
  }

  return list;
};

const getShortDesc = (desc) => {
  if (desc.length < 140) {
    return desc;
  }

  desc = desc
    .substr(0, 139)
    .trim()
    .replace(/,$/g, ``);

  return `${desc}&hellip;`;
};

const getRandomNames = (min, max) => {
  const quantity = Math.floor(Math.random() * (max - min)) + min;
  const list = new Set();

  while (list.size < quantity) {
    list.add(getRandomItem(NAMES));
  }

  return list;
};

const getCardsData = (quantity) => {
  const data = [];

  for (let i = 0; i < quantity; i++) {
    const poster = getRandomItem(POSTERS);
    const title = getRandomItem(TITLES);
    const origTitle = getRandomItem(TITLES);
    const desc = getDesc();
    const shortDesc = getShortDesc(desc);
    const genre = getRandomItem(GENRES);
    const releaseDate = getRandomDate(`years`);
    const runtime = getRandomDuration();
    const rating = getRandomRating();
    const comments = getRandomComments();
    const isInWatchList = Math.random() > 0.5;
    const isWatched = Math.random() > 0.5;
    const isFavorite = Math.random() > 0.5;
    const ageRating = getRandomItem(Object.keys(AGE_RATINGS));
    const country = getRandomItem(COUNTRIES);
    const director = getRandomItem(NAMES);
    const writers = getRandomNames(2, 5);
    const actors = getRandomNames(5, 10);

    data.push({
      poster,
      title,
      origTitle,
      desc,
      shortDesc,
      genre,
      releaseDate,
      runtime,
      rating,
      ageRating,
      comments,
      country,
      director,
      writers,
      isInWatchList,
      actors,
      isWatched,
      isFavorite
    });
  }

  return data;
};

export {getCardsData};
