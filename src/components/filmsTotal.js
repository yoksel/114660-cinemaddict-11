import {createElement, getPlurals} from '../helpers';

export default class FilmsTotal {
  constructor(counter) {
    this._counter = counter;
  }

  _getTmpl() {
    const moviesText = getPlurals(this._counter, [`movie`, `movies`]);

    return (
      `<p>${this._counter} ${moviesText} inside</p>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTmpl());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
