import {createElement} from '../helpers';

export default class Filter {
  constructor({cardsData, currentFilter}) {
    this._data = cardsData;
    this._currentFilter = currentFilter || `all`;

    this._sections = [
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

    this._element = createElement(this._getTmpl());
  }

  _getItems() {
    return this._sections.reduce((prev, section) => {
      const {id, key, name} = section;
      let counter = 0;
      let counterMarkup = ``;
      let className = `main-navigation__item`;

      if (key) {
        counter = this._data.filter((item) => item[key]).length;
        counterMarkup = `<span class="main-navigation__item-count">
          ${counter}
        </span>`;
      }

      if (id === this._currentFilter) {
        className += ` ${className}--active`;
      }

      return (
        `${prev} <a href="#${id}" class="${className}">
          ${name} ${counterMarkup}
        </a>`
      );
    }, ``);
  }

  _getTmpl() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${this._getItems()}
        </div>

        <a href="#stats"
          class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  getElement() {
    return this._element;
  }
}
