import FilmControls from '../film-controls';

export default class Controls extends FilmControls {
  constructor(params) {
    super(params);

    this._tag = {
      open: `<section class="film-details__controls">`,
      close: `</section>`
    };

    this._itemClassName = `.film-details__control-label`;
    this._inputClassName = `.film-details__control-input`;
  }

  _getControl({id, key, text, isActive}) {
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
}
