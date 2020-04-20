import AbstractComponent from '../abstract-component';
import {getRelativeDate} from '../../helpers';

export default class Comment extends AbstractComponent {
  constructor({author, text, emoji, date}) {
    super();

    this._author = author;
    this._text = text;
    this._emoji = emoji;
    this._date = getRelativeDate(date);
  }

  _getTmpl() {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${this._emoji}.png" width="55" height="55" alt="emoji-${this._emoji}">
        </span>

        <div>
          <p class="film-details__comment-text">
            ${this._text}
          </p>

          <p class="film-details__comment-info">
            <span class="film-details__comment-author">
              ${this._author}
            </span>

            <span class="film-details__comment-day">
              ${this._date}
            </span>

            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
      `
    );
  }
}
