import AbstractComponent from '../abstract-component';
import {createElement, renderElement, getRelativeDate, shake} from '../../helpers';

const ButtonText = {
  DEFAULT: `Delete`,
  WAITING: `Deleting...`
};

export default class CommentsList extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;
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

  setDeleteClickHandler(handler) {
    const deleteButtonElements = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    const deleteClickHandler = this._createDeleteClickHandler(handler);

    deleteButtonElements.forEach((item) => {
      item.addEventListener(`click`, deleteClickHandler);
      item.addEventListener(`click`, () => {
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

  _getEmojiMarkup(emoji) {
    if (!emoji) {
      return ``;
    }

    return `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
  }

  _getCommentElement({id, author, text, emoji, date}) {

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

          <button class="film-details__comment-delete" type="button">${ButtonText.DEFAULT}</button>
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
