import {createElement} from '../helpers';

export default class Sort {
  constructor(currentSort) {
    this.currentSort = currentSort || `default`;

    this.sections = [
      `default`,
      `date`,
      `rating`
    ];

    this.element = createElement(this.getTmpl());
  }

  getItems() {
    return this.sections.reduce((prev, item) => {
      let className = `sort__button`;

      if (item === this.currentSort) {
        className += ` ${className}--active`;
      }

      return (
        `${prev}<li>
          <a href="#" class="${className}">Sort by ${item}</a>
        </li>`
      );
    }, ``);
  }

  getTmpl() {
    return (
      `<ul class="sort">${this.getItems()}</ul>`
    );
  }

  getElement() {
    return this.element;
  }
}
