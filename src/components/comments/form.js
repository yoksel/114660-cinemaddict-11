import AbstractComponent from '../abstract-component';
import EmojiControls from './emoji-controls';
import {createElement, renderElement} from '../../helpers';

export default class Form extends AbstractComponent {
  constructor() {
    super();

    this._emojiControls = new EmojiControls();
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    renderElement(element, this._emojiControls);

    return element;
  }

  _getTmpl() {
    return (
      `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
      </div>`
    );
  }
}

