import FilmControls from '../film-controls';

export default class Controls extends FilmControls {
  constructor(params) {
    super(params);

    this._tag = {
      open: `<section class="film-details__controls">`,
      close: `</section>`
    };

    this._itemClassName = `film-details__control-label`;
    this._inputClassName = `film-details__control-input`;
  }

  _getControl({id, key, text, isActive}) {
    const checkedAttr = isActive ? `checked` : ``;

    return (
      `<input
        type="checkbox"
        class="${this._inputClassName} visually-hidden"
        id="${id}"
        name="${id}"
        data-prop="${key}"
        ${checkedAttr}
      >
      <label
        for="${id}"
        class="${this._itemClassName} ${this._itemClassName}--${id}"
      >${text}</label>`
    );
  }
}
