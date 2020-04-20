import AbstractComponent from '../abstract-component';
import {getPlurals, getListAsStr, getFullDate, getRuntime} from '../../helpers';

export default class Table extends AbstractComponent {
  constructor({
    genres,
    releaseDate,
    runtime,
    director,
    writers,
    actors,
    country
  }) {
    super();

    this._genres = genres;
    this._releaseDate = releaseDate;
    this._runtime = runtime;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._country = country;
  }

  _getGenresMarkup() {
    return this._genres.reduce((prev, item) => {
      return (
        `${prev} <span class="film-details__genre">${item}</span>`
      );
    }, ``);
  }

  _getTmpl() {
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
}
