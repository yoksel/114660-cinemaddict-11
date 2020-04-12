import {createElement, getRuntime, getFullDate, getFilmControlsData, getPlurals} from '../helpers';
import {AGE_RATINGS} from '../constants';
import Comments from './comments';

export default class Details {
  constructor({
    poster,
    title,
    origTitle,
    desc,
    genres,
    releaseDate,
    runtime,
    rating,
    ageRating,
    comments,
    country,
    director,
    writers,
    actors,
    isInWatchList,
    isWatched,
    isFavorite
  }) {
    this.poster = poster;
    this.title = title;
    this.origTitle = origTitle;
    this.desc = desc;
    this.genres = genres;
    this.releaseDate = releaseDate;
    this.runtime = runtime;
    this.rating = rating;
    this.ageRating = ageRating;
    this.comments = comments;
    this.country = country;
    this.director = director;
    this.writers = writers;
    this.actors = actors;

    this.isInWatchList = isInWatchList;
    this.isWatched = isWatched;
    this.isFavorite = isFavorite;

    this.controlsData = getFilmControlsData({
      isInWatchList,
      isWatched,
      isFavorite,
    });
  }

  getListStr(list) {
    return list.join(`, `);
  }

  getGenresMarkup() {
    return this.genres.reduce((prev, item) => {
      return `${prev} <span class="film-details__genre">${item}</span>`;
    },
    ``);
  }

  getPoster() {
    return (
      `<div class="film-details__poster">
        <img class="film-details__poster-img" src="./images/posters/${this.poster}" alt="">

        <p class="film-details__age" title="${AGE_RATINGS[this.ageRating]}">${this.ageRating}</p>
      </div>`
    );
  }

  getDetailsHead() {
    return (
      `<div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${this.title}</h3>
          <p class="film-details__title-original">Original: ${this.origTitle}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${this.rating}</p>
        </div>
      </div>`
    );
  }

  getDetailsList() {
    const dataList = [
      {
        name: `Director`,
        value: this.director
      },
      {
        name: getPlurals(this.writers.length, [`Writer`, `Writers`]),
        value: this.getListStr(this.writers)
      },
      {
        name: getPlurals(this.actors.length, [`Actor`, `Actors`]),
        value: this.getListStr(this.actors)
      },
      {
        name: `Release`,
        value: getFullDate(this.releaseDate)
      },
      {
        name: `Runtime`,
        value: getRuntime(this.runtime)
      },
      {
        name: `Country`,
        value: this.country
      },
      {
        name: getPlurals(this.genres.length, [`Genre`, `Genres`]),
        value: this.getGenresMarkup()
      },
    ];

    const rowsMarkup = dataList
      .reduce((prev, {name, value}) => {
        return prev + `<tr class="film-details__row">
            <td class="film-details__term">${name}</td>
            <td class="film-details__cell">${value}</td>
          </tr>`;
      }, ``);

    return (
      `<table class="film-details__table">
        ${rowsMarkup}
      </table>`
    );
  }

  getDetailControl({id, text, isActive}) {
    const checkedAttr = isActive ? `checked` : ``;
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id="${id}" name="${id}"
        ${checkedAttr}
      >
      <label for="${id}" class="film-details__control-label film-details__control-label--${id}">${text}</label>`
    );
  }

  getDetailsControls() {
    const controlsMarkup = this.controlsData
      .reduce((prev, item) => {
        return prev + this.getDetailControl(item);
      }, ``);

    return (
      `<section class="film-details__controls">
        ${controlsMarkup}
      </section>`
    );
  }

  getComments() {
    const comments = new Comments(this.comments);
    return comments.getTmpl();
  }

  getElement() {
    return createElement(
        `<section class="film-details" hidden>
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>

            <div class="film-details__info-wrap">
              ${this.getPoster()}

              <div class="film-details__info">
                ${this.getDetailsHead()}

                ${this.getDetailsList()}

                <p class="film-details__film-description">
                  ${this.desc}
                </p>
              </div>
            </div>

            ${this.getDetailsControls()}
          </div>

          ${this.getComments()}
        </form>
      </section>`
    );
  }
}
