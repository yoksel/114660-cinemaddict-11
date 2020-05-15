import FilmControls from '../film-controls';
import {getClass} from '../../helpers';

export default class Controls extends FilmControls {
  constructor({isInWatchList, isWatched, isFavorite}) {
    super({isInWatchList, isWatched, isFavorite});

    this._tag = {
      open: `<form class="film-card__controls">`,
      close: `</form>`
    };

    this._itemClassName = `film-card__controls-item`;
    this._inputClassName = this._itemClassName;
  }

  _getControl({id, key, text, isActive}) {
    const mods = [id];

    if (isActive) {
      mods.push(`active`);
    }

    const className = getClass({
      base: this._itemClassName,
      mods
    });

    return (
      `<button
        class="${className}"
        type="button"
        data-prop="${key}"
      >${text}</button>`
    );
  }
}
