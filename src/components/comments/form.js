import AbstractComponent from '../abstract-component';
import EmojiControls from './emoji-controls';
import {createElement, renderElement} from '../../helpers';

export default class Form extends AbstractComponent {
  constructor({selectedEmoji}) {
    super();

    this._selectedEmoji = selectedEmoji;
    this._emojiControls = new EmojiControls({selectedEmoji});
    this._pressedButtons = {};

    this._keyDownHandler = null;
    this._keyUpHandler = () => {
      this._pressedButtons = {};
    };
  }

  setEmojiClickHandler(handler) {
    this._emojiControls.setClickHandler(handler);
  }

  _getSubmitHandler(handler) {
    const textareaElement = this.getElement().querySelector(`.film-details__comment-input`);

    return (event) => {
      if (event.key === `Enter`) {
        this._pressedButtons.enter = true;
      } else if (event.key === `Control` || event.key === `Meta`) {
        this._pressedButtons.ctrl = true;
      }

      if (this._pressedButtons.enter && this._pressedButtons.ctrl) {
        if (!textareaElement.value) {
          return;
        }

        handler(null, {
          id: String(new Date() + Math.random()),
          author: `Anonimus`,
          text: textareaElement.value,
          emoji: this._selectedEmoji,
          date: new Date()
        });
      }
    };
  }

  destroyEvents() {
    document.removeEventListener(`keydown`, this._keyDownHandler);
    document.removeEventListener(`keyup`, this._keyUpHandler);
  }

  setSubmitHandler(handler) {
    this._keyDownHandler = this._getSubmitHandler(handler);

    document.addEventListener(`keydown`, this._keyDownHandler);
    document.addEventListener(`keyup`, this._keyUpHandler);
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

