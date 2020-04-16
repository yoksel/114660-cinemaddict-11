import {getRelativeDate, createElement} from '../helpers';
import {EMOJIS} from '../constants';

export default class Comments {
  constructor(comments) {
    this._comments = comments;
  }

  _getComment({author, text, emoji, date}) {
    return (
      `<span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
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

          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>`
    );
  }

  _getCommentsList() {
    if (this._comments.length === 0) {
      return ``;
    }

    const commentsMarkup = this._comments
      .reduce((prev, item) => {
        return (
          `${prev}<li class="film-details__comment">
            ${this._getComment(item)}
          </li>`
        );
      }, ``);

    return (
      `<ul class="film-details__comments-list">
        ${commentsMarkup}
      </ul>`
    );
  }

  _getEmojiControl(name) {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}">

      <label class="film-details__emoji-label" for="emoji-${name}">
        <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji ${name}">
      </label>`
    );
  }

  _getEmojiControls() {
    const emojiControls = EMOJIS.reduce((prev, item) => {
      return prev + this._getEmojiControl(item);
    }, ``);

    return (
      `<div class="film-details__emoji-list">
        ${emojiControls}
      </div>`
    );
  }

  _getCommentForm() {
    return (
      `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        ${this._getEmojiControls()}
      </div>`
    );
  }

  _getTmpl() {
    return (
      `<div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            Comments
            <span class="film-details__comments-count">
              ${this._comments.length}
            </span>
          </h3>

          ${this._getCommentsList()}

          ${this._getCommentForm()}
        </section>
      </div>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTmpl());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
