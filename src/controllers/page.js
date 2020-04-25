import Filter from '../components/filter';
import Sort from '../components/sort';
import FilmsListController from './films-list';

import {createElement, renderElement, sortByRating, sortByDate, sortByComments} from '../helpers';

import {MAX_CARDS_TOP, MAX_CARDS_SHOW, MAX_CARDS_LOAD} from '../constants';

export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._upcomingFilmsControllers = [];
    this._topRatedFilmsControllers = [];
    this._topCommentedFilmsControllers = [];
    this._shownQuantity = 0;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._changeUpcomingSorting = this._changeUpcomingSorting.bind(this);
    this._changeUpcomingFiltering = this._changeUpcomingFiltering.bind(this);
    this._loadMoreUpcoming = this._loadMoreUpcoming.bind(this);

    this._cachedFilmsLists = {};
  }

  _getSortedFilms(sortFunc) {
    const films = this._cachedFilmsLists.all.slice();
    films.sort(sortFunc);
    return films;
  }

  _getFilmsSortedByProp(prop) {
    if (this._cachedFilmsLists[prop]) {
      return this._cachedFilmsLists[prop];
    }

    let films = [];

    switch (prop) {
      case `rating`:
        films = this._getSortedFilms(sortByRating);
        break;
      case `comments`:
        films = this._getSortedFilms(sortByComments);
        break;
      case `date`:
        films = this._getSortedFilms(sortByDate);
        break;
      default:
        films = this._cachedFilmsLists.all;
    }

    this._cachedFilmsLists[prop] = films;
    return films;
  }

  _getUpcoming(quantity = MAX_CARDS_LOAD) {
    const nextQuantity = this._shownQuantity + quantity;
    const films = this._films.slice(this._shownQuantity, nextQuantity);
    this._shownQuantity = nextQuantity;

    return films;
  }

  _getTopRated() {
    let films = this._getFilmsSortedByProp(`rating`);
    films = films.slice(0, MAX_CARDS_TOP);

    return films;
  }

  _getTopCommented() {
    let films = this._getFilmsSortedByProp(`comments`);
    films = films.slice(0, MAX_CARDS_TOP);

    return films;
  }

  _getFilmsSection() {
    const element = createElement(`<section class="films"></section>`);

    this._upcomingListController = new FilmsListController(
        element,
        this._onDataChange,
        this._onViewChange,
        {type: `upcoming`, title: `All movies. Upcoming`}
    );
    this._upcomingListController.setMoreBtnClickHandler(this._loadMoreUpcoming);

    this._topRatedListController = new FilmsListController(
        element,
        this._onDataChange,
        this._onViewChange,
        {type: `extra`, title: `Top rated`}
    );

    this._topCommentedListController = new FilmsListController(
        element,
        this._onDataChange,
        this._onViewChange,
        {type: `extra`, title: `Top commented`}
    );

    return element;
  }

  _collectAllFilmsControllers() {
    return [].concat(
        this._upcomingFilmsControllers,
        this._topRatedFilmsControllers,
        this._topCommentedFilmsControllers
    );
  }

  _updateUpcoming() {
    const upcomingFilmsContainer = this._upcomingListController.getFilmsContainerElement();
    upcomingFilmsContainer.innerHTML = ``;
    this._upcomingFilmsControllers = [];
    this._shownQuantity = 0;
    this._upcomingFilmsControllers = this._upcomingListController.renderCards(this._getUpcoming());
    this._allFilmsControllers = this._collectAllFilmsControllers();

    if (this._films.length > MAX_CARDS_SHOW) {
      this._upcomingListController.showMoreBtn();
    } else {
      this._upcomingListController.hideMoreBtn();
    }
  }

  _changeUpcomingSorting(prop) {
    this._films = this._getFilmsSortedByProp(prop);

    this._updateUpcoming();
    this._filter.reset();
  }

  _getFilteredFilms(filterProp) {
    const films = this._cachedFilmsLists.all.slice();
    return films.filter((item) => item[filterProp]);
  }

  _changeUpcomingFiltering(filterProp) {
    if (!this._cachedFilmsLists[filterProp]) {
      this._cachedFilmsLists[filterProp] = this._getFilteredFilms(filterProp);
    }
    this._films = this._cachedFilmsLists[filterProp];

    this._updateUpcoming();
    this._sort.reset();
  }

  _loadMoreUpcoming() {
    const newCards = this._getUpcoming(MAX_CARDS_LOAD);
    const newControllers = this._upcomingListController.renderCards(newCards);
    this._upcomingFilmsControllers = this._upcomingFilmsControllers.concat(newControllers);

    if (this._shownQuantity >= this._films.length) {
      this._upcomingListController.hideMoreBtn();
    }
  }

  _onDataChange(oldData, newData) {
    const filmIndex = this._films.findIndex((item) => item === oldData);
    const filmsControllersToUpdate = this._allFilmsControllers.filter((item) => item.filmData === oldData);

    if (filmIndex < 0) {
      return;
    }

    this._films[filmIndex] = newData;

    if (filmsControllersToUpdate.length === 0) {
      return;
    }

    // Update all cards with film in all sections
    filmsControllersToUpdate.forEach((item) => {
      item.render(newData);
    });
  }

  _onViewChange() {
    this._allFilmsControllers.forEach((item) => item.setDefaultView());
  }

  render(filmsData) {
    this._films = filmsData;
    this._cachedFilmsLists.all = this._films;

    this._filter = new Filter({cardsData: filmsData, currentFilter: `all`});
    this._sort = new Sort();
    const filmsSection = this._getFilmsSection();

    this._filter.setClickHandler(this._changeUpcomingFiltering);
    this._sort.setClickHandler(this._changeUpcomingSorting);

    renderElement(this._container, [
      this._filter,
      this._sort,
      filmsSection
    ]);

    this._upcomingFilmsControllers = this._upcomingListController.render(this._getUpcoming());
    if (this._films.length > MAX_CARDS_SHOW) {
      this._upcomingListController.showMoreBtn();
    }

    this._topRatedFilmsControllers = this._topRatedListController.render(this._getTopRated());
    this._topCommentedFilmsControllers = this._topCommentedListController.render(this._getTopCommented());

    this._allFilmsControllers = this._collectAllFilmsControllers();
  }
}
