import {createElement} from '../helpers';

export default class Sort {
  constructor(currentSort) {
    this._currentSort = currentSort || `default`;

    this._sections = [
      `default`,
      `date`,
      `rating`
    ];

    this._element = createElement(this._getTmpl());
  }

  _getItems() {
    return this._sections.reduce((prev, item) => {
      let className = `sort__button`;

      if (item === this._currentSort) {
        className += ` ${className}--active`;
      }

      return (
        `${prev}<li>
          <a href="#" class="${className}">Sort by ${item}</a>
        </li>`
      );
    }, ``);
  }

  _getTmpl() {
    return (
      `<ul class="sort">${this._getItems()}</ul>`
    );
  }

  getElement() {
    return this._element;
  }
}
