import AbstractComponent from '../abstract-component';
import EmojiControls from './emoji-controls';
import {createElement, renderElement} from '../../helpers';

export default class Form extends AbstractComponent {
  constructor({selectedEmoji}) {
    super();

    this._selectedEmoji = selectedEmoji;
    this._emojiControls = new EmojiControls();
  }

  setEmojiClickHandler(handler) {
    this._emojiControls.setClickHandler(handler);
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    renderElement(element, this._emojiControls);

    return element;
  }

  _getEmoji() {
    if (!this._selectedEmoji) {
      return ``;
    }

    return `<img src="images/emoji/${this._selectedEmoji}.png" width="55" height="55" alt="emoji-smile">`;
  }

  _getTmpl() {
    return (
      `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">
          ${this._getEmoji()}
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
      </div>`
    );
  }
}

