import AbstractComponent from './abstract-component';
import Card from './card';
import ShowMoreBtn from './show-more-btn';
import {createElement, renderElement, removeElement} from '../helpers';
import {MAX_CARDS_SHOW, MAX_CARDS_LOAD} from '../constants';

export default class FilmsList extends AbstractComponent {
  constructor({type, title, films}) {
    super();

    this._title = title;
    this._type = type;
    this._films = films;
    this._isUpcoming = this._type === `upcoming`;
    this._shownQuantity = 0;
    this._ShowMoreBtn = new ShowMoreBtn();
    this._filmsContainer = createElement(`<div class="films-list__container"></div>`);
    this._addCards = this._addCards.bind(this);
    this._ShowMoreBtn.setClickHandler(this._addCards);
  }

  update(filmsData) {
    this._films = filmsData;
    this._shownQuantity = 0;
    this._filmsContainer.innerHTML = ``;
    this._addCards();
  }

  _getFilmsList() {
    if (this._films.length <= MAX_CARDS_SHOW) {
      return this._films;
    }

    const nextQuantity = this._shownQuantity + MAX_CARDS_LOAD;
    const films = this._films.slice(this._shownQuantity, nextQuantity);

    if (nextQuantity >= this._films.length) {
      removeElement(this._ShowMoreBtn);
    }

    this._shownQuantity = nextQuantity;

    return films;
  }

  _addCards() {
    const filmsList = this._getFilmsList();

    for (const film of filmsList) {
      renderElement(this._filmsContainer, new Card(film));
    }
  }

  _getClassName() {
    let className = `films-list`;

    if (!this._isUpcoming) {
      className += ` ${className}--${this._type}`;
    }

    return className;
  }

  _getTitle() {
    let className = `films-list__title`;

    if (this._isUpcoming) {
      className += ` visually-hidden`;
    }

    return (
      `<h2 class="${className}">
        ${this._title}
      </h2>`
    );
  }

  _getTmpl() {
    return (
      `<section class="${this._getClassName()}">
        ${this._getTitle()}
      </section>`
    );
  }

  _createElement() {
    if (this._films.length === 0) {
      return null;
    }

    const element = createElement(this._getTmpl());
    renderElement(element, this._filmsContainer);

    if (this._films.length > MAX_CARDS_SHOW) {
      renderElement(element, this._ShowMoreBtn);
    }

    this._addCards();

    return element;
  }
}
