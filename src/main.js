import PageController from './controllers/page';

import Profile from './components/profile';
import FilmsTotal from './components/films-total';

import {renderElement} from './helpers';

import {TOTAL_FILMS} from './mocks/constants';
import {getCardsData} from './mocks/cards';
import {getUserData} from './mocks/user';

const cardsData = getCardsData(TOTAL_FILMS);
const userData = getUserData(cardsData);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const filmsTotalElem = document.querySelector(`.footer__statistics`);

const pageController = new PageController(siteMainElem);
const profile = new Profile(userData);
const filmsTotal = new FilmsTotal(cardsData.length);

renderElement(siteHeaderElem, profile);

pageController.render(cardsData);

renderElement(filmsTotalElem, filmsTotal);
