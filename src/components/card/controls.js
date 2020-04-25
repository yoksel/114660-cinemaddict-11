import AbstractComponent from '../abstract-component';

import {getClass, getFilmControlsData} from '../../helpers';

export default class Controls extends AbstractComponent {
  constructor({isInWatchList, isWatched, isFavorite}) {
    super();

    this._controlsData = getFilmControlsData({
      isInWatchList,
      isWatched,
      isFavorite,
    });
  }

  _getClickHandler(handler) {
    return (event) => {
      const control = event.target.closest(`.film-card__controls-item`);

      if (!control) {
        return;
      }

      const {prop} = control.dataset;

      if (!prop) {
        return;
      }

      handler(prop);
    };
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, this._getClickHandler(handler));
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
