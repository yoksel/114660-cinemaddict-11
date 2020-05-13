import AbstractSmartComponent from '../abstract-smart-component';
import CloseButton from './close-button';
import Poster from './poster';
import Desc from './desc';
import Head from './head';
import Table from './table';
import Controls from './controls';
import Comments from '../comments';
import {createElement, renderElement} from '../../helpers';

export default class Details extends AbstractSmartComponent {
  constructor(params) {
    super();

    this._params = params;
    const {filmData, getEmoji, getText, resetComment} = params;
    this._filmData = filmData;
    this._resetComment = resetComment;
    this._getEmoji = getEmoji;
    this._getText = getText;
    this._closeButton = new CloseButton();
    this._poster = new Poster(filmData);
    this._desc = new Desc(filmData);
    this._head = new Head(filmData);
    this._table = new Table(filmData);
    this._comments = new Comments(this._params);
    this._controls = new Controls(filmData);
  }

  setCloseButtonClickHandler(handler) {
    this._closeButton.setClickHandler(handler);
  }

  setControlsClickHandler(handler) {
    this._controls.setClickHandler(handler);
  }

  setCommentsActionsHandler(handler) {
    this._comments.setActionsHandler(handler);
    this._commentsActionsHandler = handler;
  }

  removeEvents() {
    this._comments.removeEvents();
    this._controls.removeEvents();
  }

  resetComment() {
    this.removeEvents();
    this._comments = new Comments(this._params);

    this.rerender();
  }

  shakeComment() {
    this._comments.shakeComment();
  }

  highlightCommentOnError(id) {
    this._comments.highlightCommentOnError(id);
  }

  highlightFormOnError() {
    this._comments.highlightFormOnError();
  }

  _recoveryListeners() {
  }

  _getInfo() {
    const element = createElement(`<div class="film-details__info"></div>`);

    renderElement(element, [
      this._head,
      this._table,
      this._desc
    ]);

    return element;
  }

  _getInfoContainer() {
    const element = createElement(`<div class="film-details__info-wrap"></div>`);
    renderElement(element, [
      this._poster,
      this._getInfo()
    ]);

    return element;
  }

  _getTopContainer() {
    const element = createElement(`<div class="form-details__top-container"></div>`);

    renderElement(element, [
      this._closeButton,
      this._getInfoContainer(),
      this._controls
    ]);

    return element;
  }

  _getForm() {
    const element = createElement(`<form class="film-details__inner" action="" method="get"></form>`);

    renderElement(element, [
      this._getTopContainer(),
      this._comments
    ]);

    return element;
  }

  _getTmpl() {
    return (
      `<section class="film-details"></section>`
    );
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    renderElement(element, this._getForm());

    return element;
  }
}
