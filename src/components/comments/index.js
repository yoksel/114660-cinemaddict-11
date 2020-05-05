import AbstractComponent from '../abstract-component';
import CommentsList from './comments-list';
import Form from './form';
import {createElement, renderElement} from '../../helpers';

export default class Comments extends AbstractComponent {
  constructor({selectedEmoji, commentText, comments}) {
    super();

    this._comments = comments;
    this._commentsList = new CommentsList(comments);
    this._form = new Form({selectedEmoji, commentText});
  }

  setEmojiClickHandler(handler) {
    this._form.setEmojiClickHandler(handler);
  }

  setTextInputHandler(handler) {
    this._form.setTextInputHandler(handler);
  }

  setActionsHandler(handler) {
    this._commentsList.setDeleteClickHandler(handler);
    this._form.setSubmitHandler(handler);
  }

  removeEvents() {
    this._form.removeEvents();
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const wrapper = element.querySelector(`.film-details__comments-wrap`);

    renderElement(wrapper, [
      this._commentsList,
      this._form
    ]);

    return element;
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
        </section>
      </div>`
    );
  }
}
