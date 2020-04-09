import {getRuntime} from '../helpers/getRuntime';
import {getFullDate} from '../helpers/getDateTime';
import {getFilmControlsData} from '../helpers/getFilmControlsData';
import {AGE_RATINGS} from '../const';
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
    this.genres = this.getGenresMarkup(genres);
    this.releaseDate = getFullDate(releaseDate);
    this.runtime = getRuntime(runtime);
    this.rating = rating;
    this.ageRating = ageRating;
    this.comments = comments;
    this.country = country;
    this.director = director;
    this.writers = this.getListStr(writers);
    this.actors = this.getListStr(actors);

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

  getGenresMarkup(genres) {
    return genres.reduce((prev, item) => {
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
    const dataList = {
      'Director': this.director,
      'Writers': this.writers,
      'Actors': this.actors,
      'Release': this.releaseDate,
      'Runtime': this.runtime,
      'Country': this.country,
      'Genres': this.genres,
    };

    const rowsMarkup = Object.entries(dataList)
      .reduce((prev, [name, value]) => {
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

  getTmpl() {
    return (
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
