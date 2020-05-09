import FilmsModel from './models/films';
import UserModel from './models/user';

import ProfileController from './controllers/profile';
import FilterController from './controllers/filter';
import SortController from './controllers/sort';
import PageController from './controllers/page';
import UserStatsController from './controllers/user-stats';

import FilmsTotal from './components/films-total';

import {renderElement} from './helpers';

import {FilterType, SortType} from './constants';

import {TOTAL_FILMS} from './mocks/constants';
import {getCardsData} from './mocks/cards';
import {getUserData} from './mocks/user';

const filmsModel = new FilmsModel();
filmsModel.setFilms(getCardsData(TOTAL_FILMS));

const userModel = new UserModel(filmsModel);
userModel.setUser(getUserData());

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const filmsTotalElem = document.querySelector(`.footer__statistics`);

const profileController = new ProfileController(siteHeaderElem, filmsModel, userModel);
const filterController = new FilterController(siteMainElem, filmsModel);
const sortController = new SortController(siteMainElem, filmsModel);
const pageController = new PageController(siteMainElem, filmsModel);
const filmsTotal = new FilmsTotal(filmsModel.getFilmsQuantity());
const userStatsContoller = new UserStatsController(siteMainElem, filmsModel, userModel);
let userStatsIsHidden = true;

const switchToFilms = () => {
  if (userStatsIsHidden) {
    return;
  }

  sortController.show();
  pageController.show();
  userStatsContoller.hide();

  filterController.setActiveHighlight(`filters`);
  userStatsIsHidden = true;
};

const switchToStats = () => {
  if (!userStatsIsHidden) {
    return;
  }

  filmsModel.setFilterType(FilterType.ALL);
  filmsModel.setSortType(SortType.DEFAULT);

  sortController.hide();
  pageController.hide();
  userStatsContoller.show();

  filterController.setActiveHighlight(`stats`);
  userStatsIsHidden = false;
};

profileController.render();
filterController.render();
sortController.render();
pageController.render();
userStatsContoller.render();
userStatsContoller.hide();

filterController.setStatsClickHandler(switchToStats);
filterController.setFilterItemClickHandler(switchToFilms);

renderElement(filmsTotalElem, filmsTotal);
