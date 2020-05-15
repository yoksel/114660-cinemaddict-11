import FilmController from './film';
import FilmsListComponent from '../components/films-list';
import ShowMoreButton from '../components/show-more-button';
import {renderElement, replaceElement} from '../helpers';

export default class FilmsListController {
  constructor({container, api, filmsModel, onDataChangeSuccess, onViewChange, onDetailsClose, props}) {
    this._container = container;
    this._api = api;
    this._filmsModel = filmsModel,
    this._props = props;
    this._onViewChange = onViewChange;
    this._onDetailsClose = onDetailsClose;
    this._onDataChangeSuccess = onDataChangeSuccess;
    this._moreButton = new ShowMoreButton();
    this._emptyFilmsComponent = new FilmsListComponent({type: `empty`});
    this._isFilmsMessageShown = false;
  }

  setMoreButtonClickHandler(handler) {
    this._moreButton.setClickHandler(handler);
  }

  hideMoreButton() {
    this._moreButton.hide();
  }

  showMoreButton() {
    this._moreButton.show();
  }

  hide() {
    this._filmsListComponent.hide();
  }

  show() {
    this._filmsListComponent.show();
  }

  renderCards(films) {
    const newControllers = films.map((film) => {
      const filmController = new FilmController({
        container: this._filmsContainerElement,
        api: this._api,
        filmsModel: this._filmsModel,
        onDataChangeSuccess: this._onDataChangeSuccess,
        onViewChange: this._onViewChange,
        onDetailsClose: this._onDetailsClose,
      });

      filmController.render(film);

      return filmController;
    });

    return newControllers;
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

    renderElement(this._filmsListComponent.getElement(), this._moreButton);
    renderElement(this._container, this._filmsListComponent);

    if (films.length === 0) {
      this.hide();
    }

    return this.renderCards(films);
  }
}
