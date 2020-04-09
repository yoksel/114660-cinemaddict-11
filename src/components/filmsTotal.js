import {createElement} from '../helpers/createElement';

export default class FilmsTotal {
  constructor(counter) {
    this.counter = counter;
  }

  getElement() {
    return createElement(
        `<p>${this.counter} movies inside</p>`
    );
  }
}
