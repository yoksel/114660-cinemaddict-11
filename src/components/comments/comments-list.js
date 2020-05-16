import AbstractComponent from '../abstract-component';
import ConnectionObserver from '../../connection-observer';
import {createElement, renderElement, getRelativeDate, shake} from '../../helpers';
import {ClassName} from '../../constants';

const ButtonText = {
  DEFAULT: `Delete`,
  WAITING: `Deleting...`
};

export default class CommentsList extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;

    this._connectionObserver = new ConnectionObserver();

    this._disableOnOffline = this._disableOnOffline.bind(this);
    this._enableOnOnline = this._enableOnOnline.bind(this);

    this._connectionObserver.addOfflineHandler(this._disableOnOffline);
    this._connectionObserver.addOnlineHandler(this._enableOnOnline);
  }

  _createDeleteClickHandler(handler) {
    return (event) => {
      const comment = event.target.closest(`.film-details__comment`);

      if (!comment || !comment.id) {
        return;
      }

      handler(comment.id, null);
    };
  }

  _getDeleteButtonElements() {
    if (this._deleteButtonElements) {
      return this._deleteButtonElements;
    }

    this._deleteButtonElements = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    return this._deleteButtonElements;
  }

  setDeleteClickHandler(handler) {
    const deleteButtonElements = this._getDeleteButtonElements();
    const deleteClickHandler = this._createDeleteClickHandler(handler);

    deleteButtonElements.forEach((item) => {
      item.addEventListener(`click`, (event) => {
        deleteClickHandler(event);
        item.disabled = true;
        item.innerHTML = ButtonText.WAITING;
      });
    });
  }

  highlightOnError(id) {
    const commentElement = document.getElementById(id);
    const deleteButtonElement = commentElement.querySelector(`.film-details__comment-delete`);

    shake(commentElement);

    deleteButtonElement.innerHTML = ButtonText.DEFAULT;
    deleteButtonElement.disabled = false;
  }

  _disableOnOffline() {
    const deleteButtonElements = this._getDeleteButtonElements();

    deleteButtonElements.forEach((item) => {
      item.classList.add(ClassName.DISABLED);
    });
  }

  _enableOnOnline() {
    const deleteButtonElements = this._getDeleteButtonElements();

    deleteButtonElements.forEach((item) => {
      item.classList.remove(ClassName.DISABLED);
    });
  }

  _getEmojiMarkup(emoji) {
    if (!emoji) {
      return ``;
    }

    return `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
  }

  _getCommentElement({id, author, text, emoji, date}) {
    const isOnline = this._connectionObserver.isOnline();
    const buttonDisabledClass = !isOnline ? ClassName.DISABLED : ``;

    const markup = `<li class="film-details__comment" id="${id}">
      <span class="film-details__comment-emoji">
        ${this._getEmojiMarkup(emoji)}
      </span>

      <div>
        <p class="film-details__comment-text">
          ${text}
        </p>

        <p class="film-details__comment-info">
          <span class="film-details__comment-author">
            ${author}
          </span>

          <span class="film-details__comment-day">
            ${getRelativeDate(date)}
          </span>

          <button
            class="
              film-details__comment-delete
              ${buttonDisabledClass}"
            type="button">${ButtonText.DEFAULT}</button>
        </p>
      </div>
    </li>`;

    return createElement(markup);
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    for (const comment of this._comments) {
      renderElement(element, this._getCommentElement(comment));
    }

    return element;
  }

  _getTmpl() {
    return (
      `<ul class="film-details__comments-list"></ul>`
    );
  }
}
