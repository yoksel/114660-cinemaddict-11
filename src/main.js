import FilmsModel from './models/films';

import PageController from './controllers/page';

import Profile from './components/profile';
import FilmsTotal from './components/films-total';

import {renderElement} from './helpers';

import {TOTAL_FILMS} from './mocks/constants';
import {getCardsData} from './mocks/cards';
import {getUserData} from './mocks/user';

const filmsModel = new FilmsModel();
filmsModel.setFilms(getCardsData(TOTAL_FILMS));

const cardsData = filmsModel.getFilms();
const userData = getUserData(cardsData);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const filmsTotalElem = document.querySelector(`.footer__statistics`);

const pageController = new PageController(siteMainElem, filmsModel);
const profile = new Profile(userData);
const filmsTotal = new FilmsTotal(cardsData.length);

renderElement(siteHeaderElem, profile);
pageController.render();
renderElement(filmsTotalElem, filmsTotal);
