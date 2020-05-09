import AbstractComponent from '../abstract-component';
import Controls from './controls';
import {getDuration, createElement, renderElement, getPlurals} from '../../helpers';

export default class Card extends AbstractComponent {
  constructor(filmData) {
    const {
      poster,
      title,
      shortDesc,
      genres,
      releaseDate,
      runtime,
      rating,
      comments,
    } = filmData;
    super();

    this._poster = poster;
    this._title = title;
    this._shortDesc = shortDesc;
    this._genre = genres[0] || ``;
    this._year = releaseDate.getFullYear();
    this._runtime = getDuration(runtime);
    this._rating = rating;
    this._commentsCount = comments.length;

    this._controls = new Controls(filmData);
    this._cardClickHandler = null;
  }

  setCardClickHandler(handler) {
    const element = this.getElement();
    const poster = element.querySelector(`.film-card__poster`);
    const title = element.querySelector(`.film-card__title`);
    const comments = element.querySelector(`.film-card__comments`);
    const controlsList = [poster, title, comments];

    for (const control of controlsList) {
      control.addEventListener(`click`, handler);
    }

    this._cardClickHandler = handler;
  }

  setControlsClickHandler(handler) {
    this._controls.setClickHandler(handler);
  }

  _getTmpl() {
    const commentsText = getPlurals(this._commentsCount, [`comment`, `comments`]);
    const commentsLinkMarkup = `<a class="film-card__comments">${this._commentsCount} ${commentsText}</a>`;

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>

        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._runtime}</span>
          <span class="film-card__genre">${this._genre}</span>
        </p>

        <img
          src="./images/posters/${this._poster}"
          alt="The poster of the film '${this._title}'"
          class="film-card__poster">

        <p class="film-card__description">${this._shortDesc}</p>
        ${commentsLinkMarkup}
      </article>`
    );
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    renderElement(element, this._controls);

    return element;
  }
}
