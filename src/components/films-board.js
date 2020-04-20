import AbstractComponent from './abstract-component';
import FilmsList from './films-list';
import {createElement, renderElement} from '../helpers';
import {MAX_CARDS_TOP} from '../constants';

const sortByRating = (a, b) => {
  return b.rating - a.rating;
};

const sortByDate = (a, b) => {
  return b.releaseDate - a.releaseDate;
};

const sortByComments = (a, b) => {
  return b.comments.length - a.comments.length;
};

export default class FilmsBoard extends AbstractComponent {
  constructor(filmsData) {
    super();

    this._filmsData = filmsData;
    this._topRated = this._getTopRated();
    this._topCommented = this._getTopCommented();

    this._sortedByType = {
      default: {
        films: this._filmsData.slice()
      },
      rating: {
        func: sortByRating
      },
      date: {
        func: sortByDate
      }
    };

    this.changeSorting = this.changeSorting.bind(this);
  }

  _getAndSaveSortedFilms(sortedByType) {
    const defaultFilms = this._sortedByType.default.films;
    sortedByType.films = defaultFilms.slice();
    sortedByType.films.sort(sortedByType.func);

    return sortedByType.films;
  }

  changeSorting(type) {
    const sortedByType = this._sortedByType[type];
    let films = sortedByType.films;

    if (!sortedByType.films) {
      films = this._getAndSaveSortedFilms(sortedByType);
    }

    this._filmsData = films;

    this._updateElement();
  }

  _getTopRated() {
    const films = this._filmsData.slice();

    films.sort(sortByRating);

    return films.slice(0, MAX_CARDS_TOP);
  }

  _getTopCommented() {
    const films = this._filmsData.slice();

    films.sort(sortByComments);

    return films.slice(0, MAX_CARDS_TOP);
  }

  _getSectionsData() {
    return [
      {
        type: `upcoming`,
        title: `All movies. Upcoming`,
        films: this._filmsData
      },
      {
        type: `extra`,
        title: `Top rated`,
        films: this._topRated,
      },
      {
        type: `extra`,
        title: `Most commented`,
        films: this._topCommented
      }
    ];
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    for (const section of this._getSectionsData()) {
      renderElement(element, new FilmsList(section));
    }

    return element;
  }

  _updateElement() {
    this._element.innerHTML = ``;

    for (const section of this._getSectionsData()) {
      renderElement(this._element, new FilmsList(section));
    }
  }

  _getTmpl() {
    return (
      `<section class="films"></section>`
    );
  }
}
