import Card from './card';
import {createElement} from '../helpers';
import {MAX_CARDS_SHOW, MAX_CARDS_LOAD} from '../constants';

export default class FilmsList {
  constructor({type, title, films}) {
    this._title = title;
    this._type = type;
    this._films = films;
    this._isUpcoming = this._type === `upcoming`;
    this._shownQuantity = 0;
    this._ShowMoreBtn = this._getShowMoreBtn();
    this._filmsContainer = createElement(`<div class="films-list__container"></div>`);
    this._element = this._createElement();
    this._addCards = this._addCards.bind(this);

    this._addCards();

    this._addEvents();
  }

  _addEvents() {
    if (!this._ShowMoreBtn) {
      return;
    }

    this._ShowMoreBtn.addEventListener(`click`, this._addCards);
  }

  _getFilmsList() {
    if (this._films.length <= MAX_CARDS_SHOW) {
      return this._films;
    }

    const nextQuantity = this._shownQuantity + MAX_CARDS_LOAD;
    const films = this._films.slice(this._shownQuantity, nextQuantity);

    if (nextQuantity >= this._films.length) {
      this._ShowMoreBtn.remove();
    }

    this._shownQuantity = nextQuantity;

    return films;
  }

  _getCards() {
    const cards = [];
    const films = this._getFilmsList();

    for (const film of films) {
      const card = new Card(film);
      cards.push(card.getElement());
    }

    return cards;
  }

  _addCards() {
    const cards = this._getCards();
    this._filmsContainer.append(...cards);
  }

  _getShowMoreBtn() {
    if (this._films.length <= MAX_CARDS_SHOW) {
      return ``;
    }
    const markup = `<button class="films-list__show-more">Show more</button>`;

    return createElement(markup);
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
      return ``;
    }

    const element = createElement(this._getTmpl());
    element.append(this._filmsContainer);
    element.append(this._ShowMoreBtn);

    return element;
  }

  getElement() {
    return this._element;
  }
}
