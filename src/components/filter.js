import AbstractComponent from './abstract-component';
import {FILTERS} from '../constants';

const classes = {
  default: `main-navigation__item`,
  active: `main-navigation__item--active`
};

export default class Filter extends AbstractComponent {
  constructor(filmsData, currentFilter) {
    super();

    this._data = filmsData;
    this._defaultFilter = `all`;
    this._currentFilter = currentFilter || this._defaultFilter;
  }

  setCurrentFilter(filter) {
    this._currentFilter = filter;
  }

  reset() {
    if (this._currentFilter === this._defaultFilter) {
      return;
    }

    this._currentFilter = this._defaultFilter;

    if (!this._currentControl) {
      this._currentControl = this.getElement().querySelector(`.${classes.active}`);
    }

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
    return Object.entries(FILTERS).reduce((prev, item) => {
      const [key, {id, name}] = item;
      let counter = 0;
      let counterMarkup = ``;
      let className = classes.default;
      className += ` ${classes.default}--${id}`;

      if (key !== `all`) {
        counter = this._data.filter((filmItem) => filmItem[key]).length;
        counterMarkup = `<span class="main-navigation__item-count">
          ${counter}
        </span>`;
      }

      if (key === this._currentFilter) {
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
