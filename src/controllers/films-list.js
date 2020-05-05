import FilmController from './film';
import FilmsListComponent from '../components/films-list';
import ShowMoreBtn from '../components/show-more-btn';
import {renderElement, replaceElement} from '../helpers';

export default class FilmsListController {
  constructor(container, onDataChange, onViewChange, props) {
    this._container = container;
    this._props = props;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._moreBtn = new ShowMoreBtn();
    this._emptyFilmsComponent = new FilmsListComponent({type: `empty`});
    this._isFilmsMessageShown = false;
    this._films = [];
    this._filmsControllers = [];

    this._checkIsNeedToDestroyController = this._checkIsNeedToDestroyController.bind(this);
    this._setOpenedFilmController = this._setOpenedFilmController.bind(this);
  }

  setMoreBtnClickHandler(handler) {
    this._moreBtn.setClickHandler(handler);
  }

  hideMoreBtn() {
    this._moreBtn.hide();
  }

  showMoreBtn() {
    this._moreBtn.show();
  }

  hide() {
    this._filmsListComponent.hide();
  }

  show() {
    this._filmsListComponent.show();
  }

  clearSavedData() {
    this._films = [];
    this._filmsControllers = [];
  }

  _checkIsNeedToDestroyController(filmController) {
    const isFilmInList = this._films.some((item) => item.id === filmController.filmData.id);
    // Film doesn't exist in list of currently rendered films, destroy
    if (!isFilmInList) {
      return true;
    }

    const isControllerInRendered = this._filmsControllers.some((item) => item === filmController);

    // Controller is still rendered (films cards were not updated), leave
    if (isControllerInRendered) {
      return false;
    }

    // Films were rerendered, destroy
    return true;
  }

  _setOpenedFilmController(filmController) {
    this._openedFilmController = filmController;
  }

  renderCards(films) {
    this._films = this._films.concat(films);

    if (this._openedFilmController) {
      // Remove card of opened film on rerender
      this._openedFilmController.removeCard();
    }

    const newControllers = films.map((film) => {
      const filmController = new FilmController(
          this._filmsContainerElement,
          this._onDataChange,
          this._onViewChange,
          this._checkIsNeedToDestroyController,
          this._setOpenedFilmController
      );

      filmController.render(film);

      return filmController;
    });

    this._filmsControllers = this._filmsControllers.concat(newControllers);

    return this._filmsControllers;
  }

  showNoFilmsMessage(text) {
    this._emptyFilmsComponent.setTitle(text);
    this._isFilmsMessageShown = true;

    if (!this._filmsListComponent) {
      renderElement(this._container, this._emptyFilmsComponent);
      return;
    }

    replaceElement(this._filmsListComponent, this._emptyFilmsComponent);
  }

  hideNoFilmsMessage() {
    if (!this._isFilmsMessageShown) {
      return;
    }

    replaceElement(this._emptyFilmsComponent, this._filmsListComponent);
    this._isFilmsMessageShown = false;
  }

  render(films) {
    this._filmsListComponent = new FilmsListComponent(this._props);
    this._filmsContainerElement = this._filmsListComponent.getFilmsContainerElement();

    renderElement(this._filmsListComponent.getElement(), this._moreBtn);
    renderElement(this._container, this._filmsListComponent);

    if (films.length === 0) {
      this.hide();
    }

    return this.renderCards(films);
  }
}
