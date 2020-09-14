import AbstractComponent from './abstract-component';
import {getFilmsByFilter, getHandlerWithProp} from '../helpers';
import {FilterType, FILTERS} from '../constants';

const classes = {
  items: `main-navigation__items`,
  item: `main-navigation__item`,
  itemActive: `main-navigation__item--active`,
  additional: `main-navigation__additional`,
  additionalActive: `main-navigation__additional--active`
};

export default class Filter extends AbstractComponent {
  constructor(films, currentFilter) {
    super();

    this._films = films;
    this._defaultFilter = FilterType.ALL;
    this._currentFilter = currentFilter || this._defaultFilter;
  }

  setFilterSwitchHandler(handler) {
    const controlElement = this.getElement().querySelector(`.${classes.items}`);
    const clickHandlerWithProp = getHandlerWithProp(`.${classes.item}`, handler);

    controlElement.addEventListener(`click`, clickHandlerWithProp);
    this._filterSwitchHandler = handler;
  }

  setFilterItemClickHandler(handler) {
    const controlElement = this.getElement().querySelector(`.${classes.items}`);

    controlElement.addEventListener(`click`, handler);
    this._filterItemClickHandler = handler;
  }

  setStatsClickHandler(handler) {
    const controlElement = this.getElement().querySelector(`.main-navigation__additional`);
    controlElement.addEventListener(`click`, handler);

    this._statsClickHandler = handler;
  }

  setActiveHighlight(section) {
    const filterItemsClassName = `${classes.item}--${this._currentFilter}`;
    const filterItemElement = this.getElement().querySelector(`.${filterItemsClassName}`);
    const navAdditionalElement = this.getElement().querySelector(`.${classes.additional}`);

    if (section === `filters`) {
      filterItemElement.classList.add(classes.itemActive);
      navAdditionalElement.classList.remove(classes.additionalActive);
    } else {
      filterItemElement.classList.remove(classes.itemActive);
      navAdditionalElement.classList.add(classes.additionalActive);
    }
  }

  _getItems() {
    return Object.entries(FILTERS).reduce((prev, [type, {name}]) => {
      let counterMarkup = ``;
      let className = `${classes.item} ${classes.item}--${type}`;

      if (type !== FilterType.ALL) {
        counterMarkup = `<span class="main-navigation__item-count">
          ${getFilmsByFilter(this._films, type).length}
        </span>`;
      }

      if (type === this._currentFilter) {
        className += ` ${classes.itemActive}`;
      }

      return (
        `${prev} <a href="#${type}" class="${className}" data-prop="${type}">
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
