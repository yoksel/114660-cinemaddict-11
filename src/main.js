import Profile from './components/profile';
import Filter from './components/filter';
import Sort from './components/sort';
import Films from './components/films';
import FilmsTotal from './components/films-total';
import UserStats from './components/user-stats';

import {renderElement} from './helpers';

import {TOTAL_FILMS} from './mocks/constants';
import {getCardsData} from './mocks/cards';
import {getUserData} from './mocks/user';

const cardsData = getCardsData(TOTAL_FILMS);
const userData = getUserData(cardsData);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const filmsTotalElem = document.querySelector(`.footer__statistics`);

const profile = new Profile(userData);
const filter = new Filter({cardsData, currentFilter: `all`});
const sort = new Sort();
const films = new Films(cardsData);
const userStats = new UserStats({userData, currentFilter: `all-time`});
const filmsTotal = new FilmsTotal(cardsData.length);

renderElement(siteHeaderElem, profile);

renderElement(siteMainElem, filter);
renderElement(siteMainElem, sort);
renderElement(siteMainElem, films);
renderElement(siteMainElem, userStats);

renderElement(filmsTotalElem, filmsTotal);
