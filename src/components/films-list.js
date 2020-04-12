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
    this.elem = this.getSection();
    this.filmsContainer = this.elem.querySelector(`.films-list__container`);
    this.ShowMoreBtn = this.elem.querySelector(`.films-list__show-more`);
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
    let cards = [];
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

    return (
      `<button class="films-list__show-more">Show more</button>`
    );
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

  getSection() {
    if (this.films.length === 0) {
      return ``;
    }

    return createElement(
        `<section class="${this.getClassName()}">
        ${this.getTitle()}

        <div class="films-list__container"></div>

        ${this.getShowMoreBtn()}
      </section>`
    );
  }

  getElement() {
    return this.elem;
  }
}
