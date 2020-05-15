import AbstractComponent from '../abstract-component';
import CommentsList from './comments-list';
import Form from './form';
import {createElement, renderElement} from '../../helpers';

export default class Comments extends AbstractComponent {
  // params = {filmData, setEmoji, getEmoji, setText, getText}
  constructor(params) {
    super();

    const {commentsData} = params.filmData;
    this._commentsData = commentsData;
    this._commentsList = new CommentsList(commentsData);
    this._form = new Form(params);
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

  highlightFormOnError() {
    this._form.highlightOnError();
  }

  highlightCommentOnError(id) {
    this._commentsList.highlightOnError(id);
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const wrapperElement = element.querySelector(`.film-details__comments-wrap`);

    renderElement(wrapperElement, [
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
              ${this._commentsData.length}
            </span>
          </h3>
        </section>
      </div>`
    );
  }
}
