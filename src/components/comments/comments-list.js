import AbstractComponent from '../abstract-component';
import Comment from './comment';
import {createElement, renderElement} from '../../helpers';

export default class CommentsList extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    for (const comment of this._comments) {
      renderElement(element, new Comment(comment));
    }

    return element;
  }

  _getTmpl() {
    return (
      `<ul class="film-details__comments-list"></ul>`
    );
  }
}
