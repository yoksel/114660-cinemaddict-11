import AbstractComponent from '../abstract-component';
import {createElement, getHandlerToggleClass, getFilmControlsData, getHandlerWithProp} from '../../helpers';

export default class Controls extends AbstractComponent {
  constructor({isInWatchList, isWatched, isFavorite}) {
    super();

    this._controlsData = getFilmControlsData({
      isInWatchList,
      isWatched,
      isFavorite,
    });
  }

  setClickHandler(handler) {
    this._clickHandler = getHandlerWithProp(`.film-details__control-input`, handler);
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  removeEvents() {
    this.getElement().removeEventListener(`click`, this._clickHandler);
  }

  _getDetailControl({id, key, text, isActive}) {
    const checkedAttr = isActive ? `checked` : ``;

    return (
      `<input
        type="checkbox"
        class="film-details__control-input visually-hidden"
        id="${id}"
        name="${id}"
        data-prop="${key}"
        ${checkedAttr}
      >
      <label
        for="${id}"
        class="film-details__control-label film-details__control-label--${id}"
      >${text}</label>`
    );
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    element.addEventListener(`click`, getHandlerToggleClass(`.film-details__control-label`, `state-waitng`));

    return element;
  }

  _getTmpl() {
    const controlsMarkup = this._controlsData
      .reduce((prev, item) => {
        return prev + this._getDetailControl(item);
      }, ``);

    return (
      `<section class="film-details__controls">
        ${controlsMarkup}
      </section>`
    );
  }
}
