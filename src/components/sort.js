import AbstractComponent from './abstract-component';

export default class Sort extends AbstractComponent {
  constructor(currentSort) {
    super();

    this._currentSort = currentSort || `default`;

    this._sections = [
      `default`,
      `date`,
      `rating`
    ];
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
}
