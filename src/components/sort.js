import AbstractComponent from './abstract-component';

const classes = {
  default: `sort__button`,
  active: `sort__button--active`
};

export default class Sort extends AbstractComponent {
  constructor(currentSort) {
    super();

    this._defaultSort = `default`;
    this._currentSort = currentSort || this._defaultSort;

    this._sections = [
      `default`,
      `date`,
      `rating`
    ];
  }

  reset() {
    if (this._currentSort === this._defaultSort) {
      return;
    }

    this._currentSort = this._defaultSort;
    this._currentControl.classList.remove(classes.active);
    this._currentControl = this.getElement().querySelector(`.${classes.default}--default`);
    this._currentControl.classList.add(classes.active);
  }

  _createHandler(handler) {
    return (event) => {
      const control = event.target.closest(`.${classes.default}`);

      if (!control) {
        return;
      }

      const {type} = control.dataset;

      if (type === this._currentSort) {
        return;
      }

      if (!this._currentControl) {
        this._currentControl = this.getElement().querySelector(`.${classes.active}`);
      }

      this._currentControl.classList.remove(classes.active);
      control.classList.add(classes.active);

      this._currentControl = control;
      this._currentSort = type;
      handler(type);
    };
  }

  setClickHandler(handler) {
    this._clickHandler = this._createHandler(handler);

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
            data-type="${item}">Sort by ${item}</a>
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
