import AbstractSmartComponent from './abstract-smart-component';
import {getHandlerWithProp} from '../helpers';
import {SortType} from '../constants';

const ClassName = {
  DEFAULT: `sort__button`,
  ACTIVE: `sort__button--active`
};

export default class Sort extends AbstractSmartComponent {
  constructor(currentSort) {
    super();

    this._defaultSort = SortType.DEFAULT;
    this._currentSort = currentSort || this._defaultSort;

    this._sections = [
      SortType.DEFAULT,
      SortType.DATE,
      SortType.RATING
    ];
  }

  setClickHandler(handler) {
    this._clickHandler = getHandlerWithProp(`.${ClassName.DEFAULT}`, handler);

    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _getItems() {
    return this._sections.reduce((prev, item) => {
      let className = ClassName.DEFAULT;
      className += ` ${ClassName.DEFAULT}--${item}`;

      if (item === this._currentSort) {
        className += ` ${ClassName.ACTIVE}`;
      }

      return (
        `${prev}<li>
          <a
            href="#"
            class="${className}"
            data-prop="${item}">Sort by ${item}</a>
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
