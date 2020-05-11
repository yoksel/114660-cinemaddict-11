import FilmsListController from './films-list';
import PageComponent from '../components/page';
import {renderElement, replaceElement, getFilmsSortedByProp} from '../helpers';
import {MAX_CARDS_TOP, MAX_CARDS_SHOW, MAX_CARDS_LOAD, SortType, FilterType, FILTERS, AppStates} from '../constants';

export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;
    this._upcomingFilmsControllers = [];
    this._topRatedFilmsControllers = [];
    this._topCommentedFilmsControllers = [];
    this._shownQuantity = 0;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._loadMoreUpcoming = this._loadMoreUpcoming.bind(this);
    this._onUpcomingDetailsClose = this._onUpcomingDetailsClose.bind(this);
    this._onTopCommentedDetailsClose = this._onTopCommentedDetailsClose.bind(this);

    this._filmsModel.addFilterChangeHandler(this._onFilterChange);
    this._filmsModel.addSortChangeHandler(this._onSortChange);
  }

  _getUpcoming(quantity = MAX_CARDS_LOAD) {
    const films = this._filmsModel.getFilms();
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
    let films = getFilmsSortedByProp(this._filmsModel.getFilmsAll(), SortType.RATING);
    films = films.slice(0, MAX_CARDS_TOP);

    return films;
  }

  _getTopCommented() {
    let filmsWithComments = this._filmsModel
      .getFilmsAll()
      .filter((item) => item.comments.length > 0);

    if (filmsWithComments.length === 0) {
      return [];
    }

    let films = getFilmsSortedByProp(filmsWithComments, SortType.COMMENTS);
    films = films.slice(0, MAX_CARDS_TOP);

    return films;
  }

  _onUpcomingDetailsClose() {
    if (this._isNeedToUpdateFiltered) {
      this._updateUpcoming(this._shownQuantity);
      this._isNeedToUpdateFiltered = false;
    }
  }

  _onTopCommentedDetailsClose() {
    if (this._isNeedToUpdateTopCommented) {
      this._updateTopCommented();
      this._isNeedToUpdateTopCommented = false;
    }
  }

  _initFilmsControllers(element) {
    this._upcomingListController = new FilmsListController(
        element,
        this._onDataChange,
        this._onViewChange,
        this._onUpcomingDetailsClose,
        {type: `upcoming`, title: `All movies. Upcoming`}
    );
    this._upcomingListController.setMoreBtnClickHandler(this._loadMoreUpcoming);

    this._topRatedListController = new FilmsListController(
        element,
        this._onDataChange,
        this._onViewChange,
        null,
        {type: `extra`, title: `Top rated`}
    );

    this._topCommentedListController = new FilmsListController(
        element,
        this._onDataChange,
        this._onViewChange,
        this._onTopCommentedDetailsClose,
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

  _removeControllers(prop) {
    this[prop].forEach((item) => {
      item.destroy();
    });

    this[prop] = [];
  }

  _updateUpcoming(quantity) {
    this._shownQuantity = 0;
    const films = this._getUpcoming(quantity);
    this._removeControllers(`_upcomingFilmsControllers`);

    if (films.length === 0) {
      const filterName = FILTERS[this._filmsModel.getFilterType()].name;
      const message = `There are no movies for filter "${filterName}"`;
      this._upcomingListController.showNoFilmsMessage(message);
      return;
    }

    this._upcomingListController.hideNoFilmsMessage();
    const newControls = this._upcomingListController.renderCards(films);
    this._upcomingFilmsControllers = this._upcomingFilmsControllers.concat(newControls);
    this._allFilmsControllers = this._collectAllFilmsControllers();
  }

  _updateTopCommented() {
    const films = this._getTopCommented();
    this._removeControllers(`_topCommentedFilmsControllers`);

    if (films.length === 0) {
      this._topCommentedListController.hide();
      return;
    }

    this._topCommentedListController.show();
    const newControllers = this._topCommentedListController.renderCards(films);
    this._topCommentedFilmsControllers = this._topCommentedFilmsControllers.concat(newControllers);
    this._allFilmsControllers = this._collectAllFilmsControllers();
  }

  _onSortChange() {
    this._updateUpcoming();
  }

  _onFilterChange() {
    this._updateUpcoming();
  }

  _loadMoreUpcoming() {
    const newCards = this._getUpcoming();
    const newControllers = this._upcomingListController.renderCards(newCards);
    this._upcomingFilmsControllers = this._upcomingFilmsControllers.concat(newControllers);
    this._allFilmsControllers = this._collectAllFilmsControllers();

    if (this._shownQuantity >= this._filmsModel.getFilmsQuantity()) {
      this._upcomingListController.hideMoreBtn();
    }
  }

  _checkIsNeedToUpdateFiltered(oldData, newData) {
    const currentFilter = this._filmsModel.getFilterType();

    if (currentFilter === FilterType.ALL) {
      return false;
    }

    const filterPropName = FILTERS[currentFilter].propName;
    const isNeedToUpdateFiltered = oldData[filterPropName] !== newData[filterPropName];
    return isNeedToUpdateFiltered;
  }

  _countOpenedControllers(controllers) {
    const openedControllers = controllers.filter((item) => item.detailsIsOpened);

    return openedControllers.length;
  }

  _updatePageOnSuccess(oldData, newData) {
    this._isNeedToUpdateFiltered = this._checkIsNeedToUpdateFiltered(oldData, newData);
    this._isNeedToUpdateTopCommented = oldData.comments.length !== newData.comments.length;
    const filmsControllersToUpdate = this._allFilmsControllers.filter((item) => item.filmData.id === oldData.id);

    if (filmsControllersToUpdate.length === 0) {
      return;
    }

    // Update all cards with film in all sections
    filmsControllersToUpdate.forEach((item) => {
      item.render(newData);
    });

    if (this._isNeedToUpdateFiltered) {
      const openedControllersQuantity = this._countOpenedControllers(this._upcomingFilmsControllers);

      if (openedControllersQuantity === 0) {
        this._updateUpcoming(this._shownQuantity);
      }
    }

    if (this._isNeedToUpdateTopCommented) {
      const openedControllersQuantity = this._countOpenedControllers(this._topCommentedFilmsControllers);

      if (openedControllersQuantity === 0) {
        this._updateTopCommented();
      }
    }
  }

  _onDataChange(oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((taskModel) => {
        const isSuccess = this._filmsModel.updateFilm(oldData.id, taskModel);

        if (!isSuccess) {
          return;
        }

        this._updatePageOnSuccess(oldData, taskModel);
      });
  }

  _onViewChange() {
    this._allFilmsControllers.forEach((item) => item.setDefaultView());
  }

  hide() {
    this._pageComponent.hide();
  }

  show() {
    this._pageComponent.show();
  }

  render(params = {}) {
    const {state} = params;
    const oldPageComponent = this._pageComponent;
    this._pageComponent = new PageComponent();
    this._initFilmsControllers(this._pageComponent.getElement());
    const filmsQuantity = this._filmsModel.getFilmsQuantity();

    if (state === AppStates.LOADING) {
      this._upcomingListController.showNoFilmsMessage(`Loading...`);
    } else if (state === AppStates.EMPTY || filmsQuantity === 0) {
      this._upcomingListController.showNoFilmsMessage(`There are no movies in our database`);
    } else {

      this._upcomingFilmsControllers = this._upcomingListController.render(this._getUpcoming(MAX_CARDS_SHOW));

      if (filmsQuantity > MAX_CARDS_SHOW) {
        this._upcomingListController.showMoreBtn();
      }

      this._topRatedFilmsControllers = this._topRatedListController.render(this._getTopRated());
      this._topCommentedFilmsControllers = this._topCommentedListController.render(this._getTopCommented());

      this._allFilmsControllers = this._collectAllFilmsControllers();
    }

    if (oldPageComponent) {
      replaceElement(oldPageComponent, this._pageComponent);
    } else {
      renderElement(this._container, this._pageComponent);
    }
  }
}
