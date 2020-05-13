import FilmControls from '../film-controls';

const CLASS_NAMES = {
  input: `film-details__control-input`,
  label: `film-details__control-label`
};

export default class Controls extends FilmControls {
  constructor(params) {
    super(params);

    this._tag = {
      open: `<section class="film-details__controls">`,
      close: `</section>`
    };

    this._itemClassName = `.${CLASS_NAMES.label}`;
    this._inputClassName = `.${CLASS_NAMES.input}`;
  }

  _getControl({id, key, text, isActive}) {
    const checkedAttr = isActive ? `checked` : ``;

    return (
      `<input
        type="checkbox"
        class="${CLASS_NAMES.input} visually-hidden"
        id="${id}"
        name="${id}"
        data-prop="${key}"
        ${checkedAttr}
      >
      <label
        for="${id}"
        class="${CLASS_NAMES.label} ${CLASS_NAMES.label}--${id}"
      >${text}</label>`
    );
  }
}
