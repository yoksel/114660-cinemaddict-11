import {createElement, getPlurals} from '../helpers';

export default class FilmsTotal {
  constructor(counter) {
    this._counter = counter;
    this._element = createElement(this._getTmpl());
  }

  _getTmpl() {
    const moviesText = getPlurals(this._counter, [`movie`, `movies`]);

    return (
      `<p>${this._counter} ${moviesText} inside</p>`
    );
  }

  getElement() {
    return this._element;
  }
}
