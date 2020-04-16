import {createElement, getRuntime, getFullDate, getFilmControlsData, getPlurals, getListAsStr} from '../helpers';
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
    isFavorite,
  }) {
    this._poster = poster;
    this._title = title;
    this._origTitle = origTitle;
    this._desc = desc;
    this._genres = genres;
    this._releaseDate = releaseDate;
    this._runtime = runtime;
    this._rating = rating;
    this._ageRating = ageRating;
    this._comments = comments;
    this._country = country;
    this._director = director;
    this._writers = writers;
    this._actors = actors;

    this._hideDetails = this._hideDetails.bind(this);

    this._controlsData = getFilmControlsData({
      isInWatchList,
      isWatched,
      isFavorite,
    });
  }

  _addEvents() {
    const closeBtn = this._element.querySelector(`.film-details__close-btn`);

    closeBtn.addEventListener(`click`, this._hideDetails);
  }

  _hideDetails() {
    this._element.remove();
  }

  _getGenresMarkup() {
    return this._genres.reduce((prev, item) => {
      return (
        `${prev} <span class="film-details__genre">${item}</span>`
      );
    }, ``);
  }

  _getCloseBtn() {
    return (
      `<div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>`
    );
  }

  _getPoster() {
    return (
      `<div class="film-details__poster">
        <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="">

        <p class="film-details__age" title="${AGE_RATINGS[this._ageRating]}">${this._ageRating}</p>
      </div>`
    );
  }

  _getDetailsHead() {
    return (
      `<div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${this._title}</h3>
          <p class="film-details__title-original">Original: ${this._origTitle}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${this._rating}</p>
        </div>
      </div>`
    );
  }

  _getDetailsList() {
    const dataList = [
      {
        name: `Director`,
        value: this._director
      },
      {
        name: getPlurals(this._writers.length, [`Writer`, `Writers`]),
        value: getListAsStr(this._writers)
      },
      {
        name: getPlurals(this._actors.length, [`Actor`, `Actors`]),
        value: getListAsStr(this._actors)
      },
      {
        name: `Release`,
        value: getFullDate(this._releaseDate)
      },
      {
        name: `Runtime`,
        value: getRuntime(this._runtime)
      },
      {
        name: `Country`,
        value: this._country
      },
      {
        name: getPlurals(this._genres.length, [`Genre`, `Genres`]),
        value: this._getGenresMarkup()
      },
    ];

    const rowsMarkup = dataList
      .reduce((prev, {name, value}) => {
        return (
          `${prev}<tr class="film-details__row">
            <td class="film-details__term">${name}</td>
            <td class="film-details__cell">${value}</td>
          </tr>`
        );
      }, ``);

    return (
      `<table class="film-details__table">
        ${rowsMarkup}
      </table>`
    );
  }

  _getDetailControl({id, text, isActive}) {
    const checkedAttr = isActive ? `checked` : ``;

    return (
      `<input
        type="checkbox"
        class="film-details__control-input visually-hidden"
        id="${id}"
        name="${id}"
        ${checkedAttr}
      >
      <label
        for="${id}"
        class="film-details__control-label film-details__control-label--${id}"
      >${text}</label>`
    );
  }

  _getDetailsControlsList() {
    const controlsMarkup = this._controlsData
      .reduce((prev, item) => {
        return prev + this._getDetailControl(item);
      }, ``);

    return (
      `<section class="film-details__controls">
        ${controlsMarkup}
      </section>`
    );
  }

  _getInfoContainer() {
    return (
      `<div class="film-details__info-wrap">
        ${this._getPoster()}

        <div class="film-details__info">
          ${this._getDetailsHead()}

          ${this._getDetailsList()}

          <p class="film-details__film-description">
            ${this._desc}
          </p>
        </div>
      </div>`
    );
  }

  _getTopContainer() {
    const markup = `<div class="form-details__top-container">
      ${this._getCloseBtn()}

      ${this._getInfoContainer()}

      ${this._getDetailsControlsList()}
    </div>`;

    return createElement(markup);
  }

  _getComments() {
    const comments = new Comments(this._comments);
    return comments.getElement();
  }

  _getTmpl() {
    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get"></form>
      </section>`
    );
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const form = element.querySelector(`.film-details__inner`);

    form.append(this._getTopContainer());
    form.append(this._getComments());

    return element;
  }

  getElement() {
    if (!this._element) {
      this._element = this._createElement();
      this._addEvents();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
