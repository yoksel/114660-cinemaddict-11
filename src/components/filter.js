import AbstractComponent from './abstract-component';

const classes = {
  default: `main-navigation__item`,
  active: `main-navigation__item--active`
};

export default class Filter extends AbstractComponent {
  constructor({cardsData, currentFilter}) {
    super();

    this._data = cardsData;
    this._defaultFilter = `all`;
    this._currentFilter = currentFilter || this._defaultFilter;

    this._sections = [
      {
        id: `all`,
        key: `all`,
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
  }

  reset() {
    if (this._currentFilter === this._defaultFilter) {
      return;
    }

    this._currentFilter = this._defaultFilter;
    this._currentControl.classList.remove(classes.active);
    this._currentControl = this.getElement().querySelector(`.${classes.default}--all`);
    this._currentControl.classList.add(classes.active);
  }

  _createHandler(handler) {
    return (event) => {
      const control = event.target.closest(`.${classes.default}`);
      event.preventDefault();

      if (!control) {
        return;
      }

      const {filterProp} = control.dataset;

      if (filterProp === this._currentFilter) {
        return;
      }

      if (!this._currentControl) {
        this._currentControl = this.getElement().querySelector(`.${classes.active}`);
      }

      this._currentControl.classList.remove(classes.active);
      control.classList.add(classes.active);

      this._currentControl = control;
      this._currentFilter = filterProp;
      handler(filterProp);
    };
  }

  setClickHandler(handler) {
    this._clickHandler = this._createHandler(handler);

    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _getItems() {
    return this._sections.reduce((prev, section) => {
      const {id, key, name} = section;
      let counter = 0;
      let counterMarkup = ``;
      let className = classes.default;
      className += ` ${classes.default}--${id}`;

      if (key !== `all`) {
        counter = this._data.filter((item) => item[key]).length;
        counterMarkup = `<span class="main-navigation__item-count">
          ${counter}
        </span>`;
      }

      if (id === this._currentFilter) {
        className += ` ${classes.active}`;
      }

      return (
        `${prev} <a href="#${id}" class="${className}" data-filter-prop="${key}">
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
}
