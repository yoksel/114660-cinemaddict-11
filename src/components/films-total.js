import AbstractComponent from './abstract-component';
import {getPlurals} from '../helpers';

export default class FilmsTotal extends AbstractComponent {
  constructor(counter) {
    super();

    this._counter = counter;
  }

  _getTmpl() {
    const moviesText = getPlurals(this._counter, [`movie`, `movies`]);

    return (
      `<p>${this._counter} ${moviesText} inside</p>`
    );
  }
}
