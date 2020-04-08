import Card from './card';

export default class FilmsList {
  constructor({type, title, quantity, films}) {
    this.title = title;
    this.type = type;
    this.quantity = quantity;
    this.films = films;
    this.className = `films-list`;
    this.isUpcoming = this.type === `upcoming`;
  }

  getCards() {
    let cardsMarkup = ``;

    for (const film of this.films) {
      const card = new Card(film);

      cardsMarkup += card.getTmpl();
    }

    return cardsMarkup;
  }

  getShowMoreBtn() {
    // По-хорошему, тут должно проверяться
    // количество выводимых карточек, а не тип
    if (!this.isUpcoming) {
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

  getTmpl() {
    return (
      `<section class="${this.getClassName()}">
        ${this.getTitle()}

        <div class="films-list__container">
          ${this.getCards()}
        </div>

        ${this.getShowMoreBtn()}
      </section>`
    );
  }
}
