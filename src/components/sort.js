import AbstractComponent from './abstract-component';
import {getHandlerWithProp} from '../helpers';
import {SortType} from '../constants';

const classes = {
  default: `sort__button`,
  active: `sort__button--active`
};

export default class Sort extends AbstractComponent {
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
    this._clickHandler = getHandlerWithProp(`.${classes.default}`, handler);

    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _getItems() {
    return this._sections.reduce((prev, item) => {
      let className = classes.default;
      className += ` ${classes.default}--${item}`;

      if (item === this._currentSort) {
        className += ` ${classes.active}`;
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
