import {getClass} from '../helpers/getClass';
import {getRuntime} from '../helpers/getRuntime';
import {getFilmControlsData} from '../helpers/getFilmControlsData';

export default class Card {
  constructor({
    poster,
    title,
    shortDesc,
    genres,
    releaseDate,
    runtime,
    rating,
    comments,
    isInWatchList,
    isWatched,
    isFavorite
  }) {

    this.poster = poster;
    this.title = title;
    this.shortDesc = shortDesc;
    this.genre = genres[0];
    this.year = releaseDate.getFullYear();
    this.runtime = getRuntime(runtime);
    this.rating = rating;
    this.commentsCount = comments.length;
    this.isInWatchList = isInWatchList;
    this.isWatched = isWatched;
    this.isFavorite = isFavorite;

    this.controlsData = getFilmControlsData({
      isInWatchList,
      isWatched,
      isFavorite,
    });
  }

  getCardControl({id, text, isActive}) {
    const mods = [id];

    if (isActive) {
      mods.push(`active`);
    }

    let className = getClass({
      base: `film-card__controls-item`,
      mods
    });

    return `<button class="${className}">${text}</button>`;
  }

  getCardForm() {
    let controlsMarkup = this.controlsData
      .reduce((prev, control) => prev + this.getCardControl(control), ``);

    return (
      `<form class="film-card__controls">
        ${controlsMarkup}
      </form>`
    );
  }

  getTmpl() {
    return (
      `<article class="film-card">
        <h3 class="film-card__title">${this.title}</h3>
        <p class="film-card__rating">${this.rating}</p>

        <p class="film-card__info">
          <span class="film-card__year">${this.year}</span>
          <span class="film-card__duration">${this.duration}</span>
          <span class="film-card__genre">${this.genre}</span>
        </p>

        <img src="./images/posters/${this.poster}" alt="" class="film-card__poster">

        <p class="film-card__description">${this.shortDesc}</p>
        <a class="film-card__comments">${this.commentsCount} comments</a>

        ${this.getCardForm()}
      </article>`
    );
  }
}
