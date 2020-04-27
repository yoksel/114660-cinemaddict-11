import AbstractSmartComponent from './abstract-smart-component';

export default class FilmsEmpty extends AbstractSmartComponent {
  constructor(text) {
    super();

    this._text = text;
  }

  _recoveryListeners() {}

  setText(text) {
    this._text = text;
    this.rerender();
  }

  _getTmpl() {
    return (
      `<section class="films-list">
        <h2 class="films-list__text">${this._text}</h2>
      </section>`
    );
  }
}
