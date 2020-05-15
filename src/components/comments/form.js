import he from 'he';
import AbstractSmartComponent from '../abstract-smart-component';
import EmojiControls from './emoji-controls';
import {createElement, renderElement, shake} from '../../helpers';
import {ClassName} from '../../constants';

export default class Form extends AbstractSmartComponent {
  constructor({setEmoji, getEmoji, setText, getText}) {
    super();

    this._selectedEmoji = getEmoji();
    this._commentText = getText() || ``;
    this._emojiControls = new EmojiControls({selectedEmoji: getEmoji()});
    this._pressedButtons = {};
    this._isCommentSending = false;
    this._submitGeneratedHandler = null;
    this._keyUpHandler = () => {
      this._pressedButtons = {};
    };

    this.setTextInputHandler(setText);
    this.setEmojiClickHandler(setEmoji);
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

    textareaElement.addEventListener(`input`, () => {
      if (!textareaElement.value) {
        return;
      }
      textareaElement.classList.remove(ClassName.REQUIRED);
    });

    const textInputGeneratedHandler = () => {
      this._commentText = textareaElement.value.trim();
      handler(this._commentText);
    };

    textareaElement.addEventListener(`blur`, textInputGeneratedHandler);
    this._textInputInitialHandler = handler;
  }

  highlightOnError() {
    const formElement = this.getElement();
    const textareaElement = this.getElement().querySelector(`.film-details__comment-input`);

    shake(formElement);
    textareaElement.classList.add(ClassName.REQUIRED);
    textareaElement.focus();
    textareaElement.disabled = false;
    this._isCommentSending = false;
  }

  _recoveryListeners() {
    this.setTextInputHandler(this._textInputInitialHandler);
    this.setSubmitHandler(this._submitInitialHandler);
  }

  _getSubmitHandler(handler) {
    const textareaElement = this.getElement().querySelector(`.film-details__comment-input`);
    const emojiLabelElement = this.getElement().querySelector(`.film-details__add-emoji-label`);

    return (event) => {
      if (this._isCommentSending) {
        return;
      }
      if (event.key === `Enter`) {
        this._pressedButtons.enter = true;
      } else if (event.key === `Control` || event.key === `Meta`) {
        this._pressedButtons.ctrl = true;
      }

      if (this._pressedButtons.enter && this._pressedButtons.ctrl) {
        const value = textareaElement.value.trim();

        if (!value) {
          textareaElement.classList.add(ClassName.REQUIRED);
          textareaElement.focus();
        }

        if (!this._selectedEmoji) {
          emojiLabelElement.classList.add(ClassName.REQUIRED);
        }

        if (!value || !this._selectedEmoji) {
          return;
        }

        textareaElement.classList.remove(ClassName.REQUIRED);

        if (!this._selectedEmoji) {
          emojiLabelElement.classList.add(ClassName.REQUIRED);
          return;
        }

        emojiLabelElement.classList.remove(ClassName.REQUIRED);

        textareaElement.disabled = true;

        handler(null, {
          text: he.encode(value),
          emoji: this._selectedEmoji,
          date: new Date()
        });

        this._isCommentSending = true;
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

  _getEmojiElement() {
    if (!this._selectedEmoji) {
      return ``;
    }

    return `<img src="images/emoji/${this._selectedEmoji}.png" width="55" height="55" alt="emoji-smile">`;
  }

  _getTmpl() {
    return (
      `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">
          ${this._getEmojiElement()}
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${this._commentText}</textarea>
        </label>
      </div>`
    );
  }
}

