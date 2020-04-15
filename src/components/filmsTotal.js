import {createElement, getPlurals} from '../helpers';

export default class FilmsTotal {
  constructor(counter) {
    this.counter = counter;
    this.element = createElement(this.getTmpl());
  }

  getTmpl() {
    const moviesText = getPlurals(this.counter, [`movie`, `movies`]);

    return (
      `<p>${this.counter} ${moviesText} inside</p>`
    );
  }

  getElement() {
    return this.element;
  }
}
