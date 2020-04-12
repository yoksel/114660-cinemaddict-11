import {createElement} from '../helpers';

export default class FilmsTotal {
  constructor(counter) {
    this.counter = counter;
  }

  getElement() {
    const markup = `<p>${this.counter} movies inside</p>`;

    return createElement(markup);
  }
}
