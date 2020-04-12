import {TOTAL_FILMS} from './constants';

import Profile from './components/profile';
import Filter from './components/filter';
import Sort from './components/sort';
import Films from './components/films';
import Details from './components/details';
import FilmsTotal from './components/FilmsTotal';
import UserStats from './components/user-stats';

import {getCardsData} from './mocks/cards';
import {getUserData} from './mocks/user';

const cardsData = getCardsData(TOTAL_FILMS);
const userData = getUserData(cardsData);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const filmsTotalElem = document.querySelector(`.footer__statistics`);

const profile = new Profile(userData);
const filter = new Filter(cardsData);
const sort = new Sort();
const films = new Films(cardsData);
const details = new Details(cardsData[0]);
const userStats = new UserStats(userData);
const filmsTotal = new FilmsTotal(cardsData.length);

const render = (target, elem) => {
  target.append(elem);
};

render(siteHeaderElem, profile.getElement());

render(siteMainElem, filter.getElement());
render(siteMainElem, sort.getElement());
render(siteMainElem, films.getElement());
render(siteMainElem, userStats.getElement());

render(filmsTotalElem, filmsTotal.getElement());

render(document.body, details.getElement());
