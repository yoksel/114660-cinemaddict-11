import AbstractComponent from './abstract-component';

export default class AbstractSmartComponent extends AbstractComponent {
  hide() {
    this.getElement().hidden = true;
  }

  show() {
    this.getElement().hidden = false;
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();

    const newElement = this.getElement();
    oldElement.replaceWith(newElement);

    this._recoveryListeners();
  }

  _recoveryListeners() {
    throw new Error(`Override _recoveryListeners() method in your component`);
  }
}
