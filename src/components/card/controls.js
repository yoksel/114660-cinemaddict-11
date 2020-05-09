import AbstractComponent from '../abstract-component';
import {getClass, getFilmControlsData, getHandlerWithProp, getHandlerToggleClass, createElement} from '../../helpers';

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
    const clickHandler = getHandlerWithProp(`.film-card__controls-item`, handler);
    this.getElement().addEventListener(`click`, clickHandler);
  }

  _getCardControl({id, key, text, isActive}) {
    const mods = [id];

    if (isActive) {
      mods.push(`active`);
    }

    const className = getClass({
      base: `film-card__controls-item`,
      mods
    });

    return (
      `<button
        class="${className}"
        data-prop="${key}"
      >${text}</button>`
    );
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    element.addEventListener(`click`, getHandlerToggleClass(`.film-card__controls-item`, `state-waitng`));

    return element;
  }

  _getTmpl() {
    const controlsMarkup = this._controlsData
      .reduce((prev, control) => prev + this._getCardControl(control), ``);

    return (
      `<form class="film-card__controls">
        ${controlsMarkup}
      </form>`
    );
  }
}
