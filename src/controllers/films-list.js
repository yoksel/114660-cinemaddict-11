import FilmController from './film';
import FilmsListComponent from '../components/films-list';
import ShowMoreBtn from '../components/show-more-btn';
import {renderElement} from '../helpers';

export default class FilmsListController {
  constructor(container, onDataChange, onViewChange, props) {
    this._container = container;
    this._props = props;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._moreBtn = new ShowMoreBtn();
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
    return this._filmsContainerElement;
  }

  render(films) {
    this._films = films;
    const props = Object.assign({}, this._props, {films});
    this._filmsListComponent = new FilmsListComponent(props);
    this._filmsContainerElement = this._filmsListComponent.getFilmsContainerElement();

    renderElement(this._filmsListComponent.getElement(), this._moreBtn);
    renderElement(this._container, this._filmsListComponent);

    return this.renderCards(films);
  }
}
