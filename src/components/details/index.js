import AbstractSmartComponent from '../abstract-smart-component';
import CloseBtn from './close-btn';
import Poster from './poster';
import Desc from './desc';
import Head from './head';
import Table from './table';
import Controls from './controls';
import Comments from '../comments';
import {createElement, renderElement} from '../../helpers';

export default class Details extends AbstractSmartComponent {
  constructor(filmData) {
    super();

    this._filmData = filmData;
    this._closeBtn = new CloseBtn();
    this._poster = new Poster(filmData);
    this._desc = new Desc(filmData);
    this._head = new Head(filmData);
    this._table = new Table(filmData);
    this._comments = new Comments(filmData);
    this._controls = new Controls(filmData);

    this.setEmoji = this.setEmoji.bind(this);

    this._addEvents();
  }

  setCloseBtnClickHandler(handler) {
    this._closeBtn.setClickHandler(handler);
  }

  setControlsClickHandler(handler) {
    this._controls.setClickHandler(handler);
  }

  setCommentsActionsHandler(handler) {
    this._comments.setActionsHandler(handler);
    this._commentsActionsHandler = handler;
  }

  destroyEvents() {
    this._comments.destroyEvents();
  }

  reset() {
    if (!this._filmData.selectedEmoji) {
      return;
    }

    this._filmData = Object.assign(
        this._filmData,
        {selectedEmoji: null}
    );

    this._comments = new Comments(this._filmData);

    this.rerender();
  }

  setEmoji(emoji = ``) {
    this._filmData = Object.assign(
        this._filmData,
        {selectedEmoji: emoji}
    );

    this._comments.destroyEvents();
    this._comments = new Comments(this._filmData);
    this.setCommentsActionsHandler(this._commentsActionsHandler);

    this.rerender();
  }

  _addEvents() {
    this._comments.setEmojiClickHandler(this.setEmoji);
  }

  _recoveryListeners() {
    this._addEvents();
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
      this._closeBtn,
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
