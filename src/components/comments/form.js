import he from 'he';
import AbstractSmartComponent from '../abstract-smart-component';
import ConnectionObserver from '../../connection-observer';
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
    this._connectionObserver = new ConnectionObserver();

    this.setTextInputHandler(setText);
    this.setEmojiClickHandler(setEmoji);

    this._disableOnOffline = this._disableOnOffline.bind(this);
    this._enableOnOnline = this._enableOnOnline.bind(this);

    this._connectionObserver.addOfflineHandler(this._disableOnOffline);
    this._connectionObserver.addOnlineHandler(this._enableOnOnline);
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
    const textareaElement = this._getTextareaElement();

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

    textareaElement.addEventListener(`input`, textInputGeneratedHandler);
    this._textInputInitialHandler = handler;
  }

  setSubmitHandler(handler) {
    this._submitGeneratedHandler = this._getSubmitHandler(handler);
    this._submitInitialHandler = handler;

    document.addEventListener(`keydown`, this._submitGeneratedHandler);
    document.addEventListener(`keyup`, this._keyUpHandler);
  }

  highlightOnError() {
    const formElement = this.getElement();
    const textareaElement = this._getTextareaElement();

    shake(formElement);
    textareaElement.classList.add(ClassName.REQUIRED);
    textareaElement.focus();
    textareaElement.disabled = false;
    this._isCommentSending = false;
  }

  removeEvents() {
    document.removeEventListener(`keydown`, this._submitGeneratedHandler);
    document.removeEventListener(`keyup`, this._keyUpHandler);
  }

  _disableOnOffline() {
    const formElement = this.getElement();
    const textareaElement = this._getTextareaElement();

    formElement.classList.add(ClassName.DISABLED);
    textareaElement.disabled = true;
  }

  _enableOnOnline() {
    const formElement = this.getElement();
    const textareaElement = this._getTextareaElement();

    formElement.classList.remove(ClassName.DISABLED);
    textareaElement.disabled = false;
  }

  _recoveryListeners() {
    this.setTextInputHandler(this._textInputInitialHandler);
    this.setSubmitHandler(this._submitInitialHandler);
  }

  _getTextareaElement() {
    if (this._textareaElement) {
      return this._textareaElement;
    }

    // Allow to get textarea element before rendering
    this._textareaElement = this.getElement().querySelector(`.film-details__comment-input`);

    return this._textareaElement;
  }

  _getSubmitHandler(handler) {
    const textareaElement = this._getTextareaElement();
    const emojiLabelElement = this.getElement().querySelector(`.film-details__add-emoji-label`);

    return (event) => {
      if (this._isCommentSending || !this._connectionObserver.isOnline()) {
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

  _createElement() {
    const element = createElement(this._getTmpl());
    renderElement(element, this._emojiControls);

    // Update prop on rerender
    this._textareaElement = element.querySelector(`.film-details__comment-input`);

    return element;
  }

  _getEmojiElement() {
    if (!this._selectedEmoji) {
      return ``;
    }

    return `<img src="images/emoji/${this._selectedEmoji}.png" width="55" height="55" alt="emoji-smile">`;
  }

  _getTmpl() {
    const isOnline = this._connectionObserver.isOnline();
    const commentWrapperDisabledClass = !isOnline ? ClassName.DISABLED : ``;
    const textareaDisabledAttr = !isOnline ? `disabled` : ``;

    return (
      `<div class="film-details__new-comment ${commentWrapperDisabledClass}">
        <div for="add-emoji" class="film-details__add-emoji-label">
          ${this._getEmojiElement()}
        </div>

        <label class="film-details__comment-label">
          <textarea
            class="film-details__comment-input"
            placeholder="Select reaction below and write comment here"
            name="comment"
            ${textareaDisabledAttr}
          >${this._commentText}</textarea>
        </label>
      </div>`
    );
  }
}

