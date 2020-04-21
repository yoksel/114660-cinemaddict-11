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

    this._sortedByDefault = this._filmsData.slice();

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

  _getSortedFilms(sortFunc) {
    const films = this._sortedByDefault.slice();
    films.sort(sortFunc);

    return films;
  }

  changeUpcomingSorting(type) {
    let films = [];

    if (type === `default`) {
      films = this._sortedByDefault;
    } else if (type === `rating`) {
      if (!this._sortedByRating) {
        this._sortedByRating = this._getSortedFilms(sortByRating);
      }

      films = this._sortedByRating;
    } else if (type === `date`) {
      if (!this._sortedByDate) {
        this._sortedByDate = this._getSortedFilms(sortByDate);
      }

      films = this._sortedByDate;
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
