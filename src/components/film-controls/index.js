import AbstractComponent from '../abstract-component';
import { getFilmControlsData } from './get-film-controls-data';
import { getHandlerWithProp, getHandlerToggleClass, createElement } from '../../helpers';

export default class Controls extends AbstractComponent {
  constructor(params) {
    super();

    const {isInWatchList, isWatched, isFavorite} = params;

    this._controlsData = getFilmControlsData({
      isInWatchList,
      isWatched,
      isFavorite,
    });

    if (new.target === Controls) {
      throw new Error(`Controls is not allowed as a constructor`);
    }
  }

  setClickHandler(handler) {
    this._clickHandler = getHandlerWithProp(this._inputClassName, handler);
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  removeEvents() {
    this.getElement().removeEventListener(`click`, this._clickHandler);
  }

  _getControl() {
    throw new Error(`Override method _getControl() in your component`);
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    element.addEventListener(`click`, getHandlerToggleClass(this._itemClassName, `state-waitng`));

    return element;
  }

  _getTmpl() {
    const controlsMarkup = this._controlsData
      .reduce((prev, control) => prev + this._getControl(control), ``);

    return (
      `${this._tag.open}
        ${controlsMarkup}
      ${this._tag.close}`
    );
  }
}
