import FilmControls from '../film-controls';
import {getClass} from '../../helpers';

export default class Controls extends FilmControls {
  constructor(params) {
    super(params);

    this._tag = {
      open: `<form class="film-card__controls">`,
      close: `</form>`
    };

    this._itemClassName = `.film-card__controls-item`;
    this._inputClassName = this._itemClassName;
  }

  _getControl({id, key, text, isActive}) {
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
}
