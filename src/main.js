import { MAX_CARDS, MAX_CARDS_LOAD } from './const.js';

import Profile from './components/profile';
import Filter from './components/filter';
import Sort from './components/sort';
import Films from './components/films';
import Details from './components/details';
import FilmsTotal from './components/FilmsTotal';
import UserStats from './components/user-stats';

import {getCardsData} from './mocks/cards';
import {getUserData} from './mocks/user';

const cardsData = getCardsData(MAX_CARDS);
const userData = getUserData(cardsData);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const filmsTotalElem = document.querySelector(`.footer__statistics`);

const profile = new Profile(userData);
const filter = new Filter(cardsData);
const sort = new Sort();
const films = new Films(cardsData);
const details = new Details(cardsData[0]);
const userStats = new UserStats({userData, cardsData});
const filmsTotal = new FilmsTotal(cardsData.length);

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

render(siteHeaderElem, profile.getTmpl());

render(siteMainElem, filter.getTmpl());
render(siteMainElem, sort.getTmpl());
render(siteMainElem, films.getTmpl());
render(siteMainElem, userStats.getTmpl());

render(filmsTotalElem, filmsTotal.getTmpl());

render(document.body, details.getTmpl());
