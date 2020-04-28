import AbstractSmartComponent from './abstract-smart-component';

export default class FilmsList extends AbstractSmartComponent {
  constructor({type, title}) {
    super();

    this._title = title || ``;
    this._type = type || ``;
    this._isUpcoming = this._type === `upcoming`;
  }

  setTitle(title) {
    this._title = title;
    this.rerender();
  }

  _recoveryListeners() {

  }

  _getClassName() {
    let className = `films-list`;

    if (!this._isUpcoming) {
      className += ` ${className}--${this._type}`;
    }

    return className;
  }

  _getTitle() {
    let className = `films-list__title`;

    if (this._isUpcoming) {
      className += ` visually-hidden`;
    }

    return (
      `<h2 class="${className}">
        ${this._title}
      </h2>`
    );
  }

  _getTmpl() {
    return (
      `<section class="${this._getClassName()}">
        ${this._getTitle()}
        <div class="films-list__container"></div>
      </section>`
    );
  }

  getFilmsContainerElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
