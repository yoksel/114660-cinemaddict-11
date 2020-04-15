import {createElement} from '../helpers';

export default class Filter {
  constructor({cardsData, currentFilter}) {
    this.data = cardsData;
    this.currentFilter = currentFilter || `all`;

    this.sections = [
      {
        id: `all`,
        name: `All movies`
      },
      {
        id: `watchlist`,
        key: `isInWatchList`,
        name: `Watchlist`
      },
      {
        id: `history`,
        key: `isWatched`,
        name: `History`
      },
      {
        id: `favorites`,
        key: `isFavorite`,
        name: `Favorites`
      },
    ];

    this.element = createElement(this.getTmpl());
  }

  getItems() {
    return this.sections.reduce((prev, section) => {
      const {id, key, name} = section;
      let counter = 0;
      let counterMarkup = ``;
      let className = `main-navigation__item`;

      if (key) {
        counter = this.data.filter((item) => item[key]).length;
        counterMarkup = `<span class="main-navigation__item-count">
          ${counter}
        </span>`;
      }

      if (id === this.currentFilter) {
        className += ` ${className}--active`;
      }

      return (
        `${prev} <a href="#${id}" class="${className}">
          ${name} ${counterMarkup}
        </a>`
      );
    }, ``);
  }

  getTmpl() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${this.getItems()}
        </div>

        <a href="#stats"
          class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  getElement() {
    return this.element;
  }
}
