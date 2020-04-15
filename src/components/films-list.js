import Card from './card';
import {createElement} from '../helpers';
import {MAX_CARDS_SHOW, MAX_CARDS_LOAD} from '../constants';

export default class FilmsList {
  constructor({type, title, quantity, films}) {
    this.title = title;
    this.type = type;
    this.quantity = quantity;
    this.films = films;
    this.className = `films-list`;
    this.isUpcoming = this.type === `upcoming`;
    this.shownQuantity = 0;
    this.ShowMoreBtn = this.getShowMoreBtn();
    this.filmsContainer = createElement(`<div class="films-list__container"></div>`);
    this.element = this.createElement();
    this.addCards = this.addCards.bind(this);

    this.addCards();

    this.addEvents();
  }

  addEvents() {
    if (!this.ShowMoreBtn) {
      return;
    }

    this.ShowMoreBtn.addEventListener(`click`, this.addCards);
  }

  getFilmsList() {
    if (this.films.length <= MAX_CARDS_SHOW) {
      return this.films;
    }

    const nextQuantity = this.shownQuantity + MAX_CARDS_LOAD;
    const films = this.films.slice(this.shownQuantity, nextQuantity);

    if (nextQuantity >= this.films.length) {
      this.ShowMoreBtn.remove();
    }

    this.shownQuantity = nextQuantity;

    return films;
  }

  getCards() {
    const cards = [];
    const films = this.getFilmsList();

    for (const film of films) {
      const card = new Card(film);
      cards.push(card.getElement());
    }

    return cards;
  }

  addCards() {
    const cards = this.getCards();
    this.filmsContainer.append(...cards);
  }

  getShowMoreBtn() {
    if (this.films.length <= MAX_CARDS_SHOW) {
      return ``;
    }
    const markup = `<button class="films-list__show-more">Show more</button>`;

    return createElement(markup);
  }

  getClassName() {
    let className = this.className;

    if (!this.isUpcoming) {
      className += ` ${this.className}--${this.type}`;
    }

    return className;
  }

  getTitle() {
    let className = `films-list__title`;

    if (this.isUpcoming) {
      className += ` visually-hidden`;
    }

    return (
      `<h2 class="${className}">
        ${this.title}
      </h2>`
    );
  }

  getTmpl() {
    return (
      `<section class="${this.getClassName()}">
        ${this.getTitle()}
      </section>`
    );
  }

  createElement() {
    if (this.films.length === 0) {
      return ``;
    }

    const element = createElement(this.getTmpl());
    element.append(this.filmsContainer);
    element.append(this.ShowMoreBtn);

    return element;
  }

  getElement() {
    return this.element;
  }
}
