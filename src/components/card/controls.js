import FilmControls from '../film-controls';
import {getClass} from '../../helpers';

const CLASS_NAMES = {
  item: `film-card__controls-item`
};

export default class Controls extends FilmControls {
  constructor(params) {
    super(params);

    this._tag = {
      open: `<form class="film-card__controls">`,
      close: `</form>`
    };

    this._itemClassName = `.${CLASS_NAMES.item}`;
    this._inputClassName = this._itemClassName;
  }

  _getControl({id, key, text, isActive}) {
    const mods = [id];

    if (isActive) {
      mods.push(`active`);
    }

    const className = getClass({
      base: CLASS_NAMES.item,
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
