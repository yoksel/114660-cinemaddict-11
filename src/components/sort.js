import AbstractComponent from './abstract-component';

const classes = {
  default: `sort__button`,
  active: `sort__button--active`
};

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

  _createHandler(handler) {
    return (event) => {
      const btn = event.target.closest(`.${classes.default}`);

      if (!btn) {
        return;
      }

      const {type} = btn.dataset;

      if (type === this._currentSort) {
        return;
      }

      if (!this._currentBtn) {
        this._currentBtn = this.getElement().querySelector(`.${classes.active}`);
      }

      this._currentBtn.classList.remove(classes.active);
      btn.classList.add(classes.active);

      this._currentBtn = btn;
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
