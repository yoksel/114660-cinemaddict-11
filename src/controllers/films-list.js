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

  renderCards(films) {
    return films.map((film) => {
      const filmController = new FilmController(
          this._filmsContainerElement,
          this._onDataChange,
          this._onViewChange
      );
      filmController.render(film);
      return filmController;
    });
  }

  getFilmsContainerElement() {
    return this._filmsListComponent.getFilmsContainerElement();
  }

  showNoFilmsMessage(text) {
    if (!this._filmsListComponent) {
      return;
    }

    this._emptyFilmsComponent.setTitle(text);
    replaceElement(this._filmsListComponent, this._emptyFilmsComponent);
    this._isFilmsMessageShown = true;
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
    this._filmsContainerElement = this.getFilmsContainerElement();

    renderElement(this._filmsListComponent.getElement(), this._moreBtn);
    renderElement(this._container, this._filmsListComponent);

    return this.renderCards(films);
  }
}
