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

    this._sectionsComponents = {
      upcoming: new FilmsList({
        type: `upcoming`,
        title: `All movies. Upcoming`,
        films: this._filmsData
      }),
      topRated: new FilmsList({
        type: `extra`,
        title: `Top rated`,
        films: this._getTopRated(),
      }),
      topCommented: new FilmsList({
        type: `extra`,
        title: `Most commented`,
        films: this._getTopCommented()
      })
    };

    this.changeUpcomingSorting = this.changeUpcomingSorting.bind(this);
  }

  _getAndSaveSortedFilms(sortedByType) {
    const defaultFilms = this._sortedByType.default.films;
    sortedByType.films = defaultFilms.slice();
    sortedByType.films.sort(sortedByType.func);

    return sortedByType.films;
  }

  changeUpcomingSorting(type) {
    const sortedByType = this._sortedByType[type];
    let films = sortedByType.films;

    if (!sortedByType.films) {
      films = this._getAndSaveSortedFilms(sortedByType);
    }

    this._sectionsComponents.upcoming.update(films);
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

  _createElement() {
    const element = createElement(this._getTmpl());

    for (const component of Object.values(this._sectionsComponents)) {
      renderElement(element, component);
    }

    return element;
  }

  _getTmpl() {
    return (
      `<section class="films"></section>`
    );
  }
}
