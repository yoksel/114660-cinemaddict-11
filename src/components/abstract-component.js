import {createElement} from '../helpers';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`AbstractComponent is not allowed as a constructor`);
    }

    this._element = null;
  }

  _getTmpl() {
    throw new Error(`Override _getTmpl() method in your component`);
  }

  _createElement() {
    return createElement(this._getTmpl());
  }

  getElement() {
    if (!this._element) {
      this._element = this._createElement();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

