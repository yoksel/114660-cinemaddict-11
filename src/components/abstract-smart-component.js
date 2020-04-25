import AbstractComponent from './abstract-component';
import {replaceElement} from '../helpers';

export default class AbstractSmartComponent extends AbstractComponent {
  _recoveryListeners() {
    throw new Error(`Override _recoveryListeners() method in your component`);
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();

    const newElement = this.getElement();
    replaceElement(oldElement, newElement);

    this._recoveryListeners();
  }
}
