import he from 'he';
import AbstractSmartComponent from '../abstract-smart-component';
import EmojiControls from './emoji-controls';
import {createElement, renderElement, getRandomID} from '../../helpers';

const CLASS_HIGHLIGHT_REQUIRED = `hightlight-required`;

export default class Form extends AbstractSmartComponent {
  constructor({selectedEmoji, commentText}) {
    super();

    this._selectedEmoji = selectedEmoji;
    this._commentText = commentText || ``;
    this._emojiControls = new EmojiControls({selectedEmoji});
    this._pressedButtons = {};
    this._submitGeneratedHandler = null;
    this._keyUpHandler = () => {
      this._pressedButtons = {};
    };
  }

  setEmojiClickHandler(handler) {
    this._emojiControls.setClickHandler((emoji) => {
      this._selectedEmoji = emoji;
      handler(emoji);
      this.removeEvents();
      this.rerender();
    });
    this._emojiClickHandler = handler;
  }

  setTextInputHandler(handler) {
    const textareaElement = this.getElement().querySelector(`.film-details__comment-input`);

    const textInputGeneratedHandler = () => {
      this._commentText = textareaElement.value.trim();
      handler(this._commentText);
    };

    textareaElement.addEventListener(`blur`, textInputGeneratedHandler);
    this._textInputInitialHandler = handler;
  }

  _recoveryListeners() {
    this.setTextInputHandler(this._textInputInitialHandler);
    this.setSubmitHandler(this._submitInitialHandler);
  }

  _getSubmitHandler(handler) {
    const textareaElement = this.getElement().querySelector(`.film-details__comment-input`);
    const emojiLabelElement = this.getElement().querySelector(`.film-details__add-emoji-label`);

    return (event) => {
      if (event.key === `Enter`) {
        this._pressedButtons.enter = true;
      } else if (event.key === `Control` || event.key === `Meta`) {
        this._pressedButtons.ctrl = true;
      }

      if (this._pressedButtons.enter && this._pressedButtons.ctrl) {
        const value = textareaElement.value.trim();

        if (!value) {
          textareaElement.classList.add(CLASS_HIGHLIGHT_REQUIRED);
          return;
        }

        textareaElement.classList.remove(CLASS_HIGHLIGHT_REQUIRED);

        if (!this._selectedEmoji) {
          emojiLabelElement.classList.add(CLASS_HIGHLIGHT_REQUIRED);
          return;
        }

        emojiLabelElement.classList.remove(CLASS_HIGHLIGHT_REQUIRED);

        handler(null, {
          id: getRandomID(),
          author: `Anonymous`,
          text: he.encode(value),
          emoji: this._selectedEmoji,
          date: new Date()
        });
      }
    };
  }

  removeEvents() {
    document.removeEventListener(`keydown`, this._submitGeneratedHandler);
    document.removeEventListener(`keyup`, this._keyUpHandler);
  }

  setSubmitHandler(handler) {
    this._submitGeneratedHandler = this._getSubmitHandler(handler);
    this._submitInitialHandler = handler;

    document.addEventListener(`keydown`, this._submitGeneratedHandler);
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
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${this._commentText}</textarea>
        </label>
      </div>`
    );
  }
}

