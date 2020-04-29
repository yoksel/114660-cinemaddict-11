import FilterController from './filter';
import FilmsListController from './films-list';
import Sort from '../components/sort';
import FilmsEmpty from '../components/films-list';
import {FILTERS} from '../constants';

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
    this._currentFilter = ``;
    this._currentSort = ``;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._changeUpcomingSorting = this._changeUpcomingSorting.bind(this);
    this._changeUpcomingFiltering = this._changeUpcomingFiltering.bind(this);
    this._loadMoreUpcoming = this._loadMoreUpcoming.bind(this);
  }

  _getSortedFilms(sortFunc, filmsToSort) {
    const films = filmsToSort.slice();
    films.sort(sortFunc);

    return films;
  }

  _getFilmsSortedByProp(prop, films) {
    films = films || this._films.slice();

    if (!this._currentSort) {
      return films;
    }

    switch (prop) {
      case `rating`:
        return this._getSortedFilms(sortByRating, films);
      case `comments`:
        return this._getSortedFilms(sortByComments, films);
      case `date`:
        return this._getSortedFilms(sortByDate, films);
      default:
        return films;
    }
  }

  _getFilteredFilms(filterProp) {
    const films = this._films.slice();

    if (!filterProp || filterProp === `all`) {
      return films;
    }

    return films.filter((item) => item[filterProp]);
  }

  _getActualFilmsList() {
    if (!this._currentFilter && !this._currentSort) {
      return this._films.slice();
    }

    let films = this._getFilteredFilms(this._currentFilter);
    films = this._getFilmsSortedByProp(this._currentSort, films);

    return films;
  }

  _getUpcoming(quantity = MAX_CARDS_LOAD) {
    const films = this._getActualFilmsList();
    const nextQuantity = this._shownQuantity + quantity;
    const cuttedFilms = films.slice(this._shownQuantity, nextQuantity);
    this._shownQuantity = nextQuantity;

    if (this._shownQuantity >= films.length) {
      this._upcomingListController.hideMoreBtn();
    } else {
      this._upcomingListController.showMoreBtn();
    }

    return cuttedFilms;
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
    return createElement(`<section class="films"></section>`);
  }

  _initFilmsControllers(element) {
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
  }

  _collectAllFilmsControllers() {
    return [].concat(
        this._upcomingFilmsControllers,
        this._topRatedFilmsControllers,
        this._topCommentedFilmsControllers
    );
  }

  _updateUpcoming(quantity) {
    this._shownQuantity = 0;
    const films = this._getUpcoming(quantity);

    if (films.length === 0) {
      this._upcomingListController.showNoFilmsMessage(`There are no movies for filter "${FILTERS[this._currentFilter].name}"`);
      return;
    }

    this._upcomingListController.hideNoFilmsMessage();

    const upcomingFilmsContainer = this._upcomingListController.getFilmsContainerElement();
    upcomingFilmsContainer.innerHTML = ``;
    this._upcomingFilmsControllers = this._upcomingListController.renderCards(films);
    this._allFilmsControllers = this._collectAllFilmsControllers();
  }

  _changeUpcomingSorting(sort) {
    this._currentSort = sort;
    this._updateUpcoming();
  }

  _changeUpcomingFiltering(filter) {
    this._currentFilter = filter;
    this._filterController.setCurrentFilter(filter);
    this._updateUpcoming();
  }

  _loadMoreUpcoming() {
    const newCards = this._getUpcoming();
    const newControllers = this._upcomingListController.renderCards(newCards);
    this._upcomingFilmsControllers = this._upcomingFilmsControllers.concat(newControllers);
    this._allFilmsControllers = this._collectAllFilmsControllers();

    if (this._shownQuantity >= this._films.length) {
      this._upcomingListController.hideMoreBtn();
    }
  }

  _onDataChange(oldData, newData) {
    const filmIndex = this._films.findIndex((item) => item === oldData);
    const isNeedToUpdateFiltered = this._currentFilter
      && oldData[this._currentFilter] !== newData[this._currentFilter]
      && newData[this._currentFilter] === false;
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

    this._filterController.render(this._films);

    if (isNeedToUpdateFiltered) {
      this._updateUpcoming(this._upcomingFilmsControllers.length);
    }
  }

  _onViewChange() {
    this._allFilmsControllers.forEach((item) => item.setDefaultView());
  }

  render(filmsData) {
    this._films = filmsData;
    this._filterController = new FilterController(this._container, this._changeUpcomingFiltering);
    this._sort = new Sort();
    const filmsSection = this._getFilmsSection();
    this._initFilmsControllers(filmsSection);

    this._sort.setClickHandler(this._changeUpcomingSorting);

    this._filterController.render(this._films);

    renderElement(this._container, [
      this._sort,
      filmsSection
    ]);

    if (this._films.length === 0) {
      renderElement(filmsSection, new FilmsEmpty({title: `There are no movies in our database`}));
      return;
    }

    this._upcomingFilmsControllers = this._upcomingListController.render(this._getUpcoming(MAX_CARDS_SHOW));

    if (this._films.length > MAX_CARDS_SHOW) {
      this._upcomingListController.showMoreBtn();
    }

    this._topRatedFilmsControllers = this._topRatedListController.render(this._getTopRated());
    this._topCommentedFilmsControllers = this._topCommentedListController.render(this._getTopCommented());

    this._allFilmsControllers = this._collectAllFilmsControllers();
  }
}
