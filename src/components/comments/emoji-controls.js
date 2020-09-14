import AbstractComponent from '../abstract-component';
import ConnectionObserver from '../../connection-observer';
import {getHandlerWithValue} from '../../helpers';
import {EMOJIS} from '../../constants';

export default class EmojiControls extends AbstractComponent {
  constructor({selectedEmoji}) {
    super();

    this._selectedEmoji = selectedEmoji;

    this._connectionObserver = new ConnectionObserver();

    const isOnline = this._connectionObserver.isOnline();
    this._inputDisabledAttr = !isOnline ? `disabled` : ``;

    this._disableOnOffline = this._disableOnOffline.bind(this);
    this._enableOnOnline = this._enableOnOnline.bind(this);

    this._connectionObserver.addOfflineHandler(this._disableOnOffline);
    this._connectionObserver.addOnlineHandler(this._enableOnOnline);
  }

  setClickHandler(handler) {
    const clickHandler = getHandlerWithValue(`.film-details__emoji-item`, handler);
    this.getElement().addEventListener(`click`, clickHandler);
  }

  _getInputsElements() {
    if (this._inputsElements) {
      return this._inputsElements;
    }

    this._inputsElements = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    return this._inputsElements;
  }

  _disableOnOffline() {
    const inputsElements = this._getInputsElements();

    inputsElements.forEach((item) => {
      item.disabled = true;
    });
  }

  _enableOnOnline() {
    const inputsElements = this._getInputsElements();

    inputsElements.forEach((item) => {
      item.disabled = false;
    });
  }

  _getEmojiControl(name) {
    const checkedAttr = name === this._selectedEmoji ? `checked` : ``;

    return (
      `<input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-${name}"
        value="${name}"
        ${checkedAttr}
        ${this._inputDisabledAttr}
      >

      <label class="film-details__emoji-label" for="emoji-${name}">
        <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji ${name}">
      </label>`
    );
  }

  _getTmpl() {
    const emojiControls = EMOJIS.reduce((prev, item) => {
      return prev + this._getEmojiControl(item);
    }, ``);

    return (
      `<div class="film-details__emoji-list">
        ${emojiControls}
      </div>`
    );
  }
}
