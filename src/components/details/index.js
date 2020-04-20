import AbstractComponent from '../abstract-component';
import CloseBtn from './close-btn';
import Poster from './poster';
import Desc from './desc';
import Head from './head';
import Table from './table';
import Controls from './controls';
import Comments from '../comments';
import {createElement, renderElement, removeElement} from '../../helpers';

export default class Details extends AbstractComponent {
  constructor(data) {
    super();

    this._closeBtn = new CloseBtn();
    this._poster = new Poster(data);
    this._desc = new Desc(data);
    this._head = new Head(data);
    this._table = new Table(data);
    this._comments = new Comments(data);
    this._controls = new Controls(data);

    this._hideDetails = this._hideDetails.bind(this);
    this._closeBtn.setClickHandler(this._hideDetails);
  }

  _hideDetails() {
    removeElement(this);
  }

  _getInfo() {
    const element = createElement(`<div class="film-details__info"></div>`);
    renderElement(element, [this._head, this._table, this._desc]);

    return element;
  }

  _getInfoContainer() {
    const element = createElement(`<div class="film-details__info-wrap"></div>`);
    renderElement(element, [this._poster, this._getInfo()]);

    return element;
  }

  _getTopContainer() {
    const element = createElement(`<div class="form-details__top-container"></div>`);

    renderElement(element, this._closeBtn);

    renderElement(element, this._getInfoContainer());
    renderElement(element, this._controls);

    return element;
  }

  _getForm() {
    const element = createElement(`<form class="film-details__inner" action="" method="get"></form>`);

    renderElement(element, [this._getTopContainer(), this._comments]);

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
