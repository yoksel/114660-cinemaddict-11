import AbstractComponent from '../abstract-component';

export default class Desc extends AbstractComponent {
  constructor({desc}) {
    super();

    this._desc = desc;
  }

  _getTmpl() {
    return (
      `<p class="film-details__film-description">
        ${this._desc}
      </p>`
    );
  }
}
