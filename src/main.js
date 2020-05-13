import FilmsModel from './models/films';
import UserModel from './models/user';

import ProfileController from './controllers/profile';
import FilterController from './controllers/filter';
import SortController from './controllers/sort';
import PageController from './controllers/page';
import UserStatsController from './controllers/user-stats';

import FilmsTotal from './components/films-total';

import {renderElement} from './helpers';

import {FilterType, SortType, AppState} from './constants';

import API from './api';

const AUTHORIZATION = `Basic ia7sdasda8s7d9a8s9`;

const api = new API(AUTHORIZATION);

const filmsModel = new FilmsModel();

const userModel = new UserModel(filmsModel);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const filmsTotalElement = document.querySelector(`.footer__statistics`);

const profileController = new ProfileController(siteHeaderElement, filmsModel, userModel);
const filterController = new FilterController(siteMainElement, filmsModel);
const sortController = new SortController(siteMainElement, filmsModel);
const pageController = new PageController(siteMainElement, filmsModel, api);
const userStatsContoller = new UserStatsController(siteMainElement, filmsModel, userModel);
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
pageController.render({state: AppState.LOADING});

api.getFilms()
  .then((response) => {
    filmsModel.setFilms(response);

    profileController.render();

    filterController.render();
    filterController.setStatsClickHandler(switchToStats);
    filterController.setFilterItemClickHandler(switchToFilms);

    sortController.render();
    pageController.render();

    userStatsContoller.render();
    userStatsContoller.hide();

    const filmsTotal = new FilmsTotal(filmsModel.getFilmsQuantity());
    renderElement(filmsTotalElement, filmsTotal);
  })
  .catch((error) => {
    pageController.render({state: AppState.EMPTY});
    // eslint-disable-next-line no-console
    console.error(error);
  });


