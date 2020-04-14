import {createElement, getPlurals} from '../helpers';

export default class FilmsTotal {
  constructor(counter) {
    this.counter = counter;
  }

  getElement() {
    const moviesText = getPlurals(this.counter, [`movie`, `movies`]);
    const markup = `<p>${this.counter} ${moviesText} inside</p>`;

    return createElement(markup);
  }
}
