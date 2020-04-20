import AbstractComponent from './abstract-component';
import FilmsList from './films-list';
import {createElement, renderElement} from '../helpers';
import {MAX_CARDS_TOP} from '../constants';

export default class FilmsBoard extends AbstractComponent {
  constructor(filmsData) {
    super();

    this._filmsData = filmsData;
  }

  _getTopRated() {
    const films = this._filmsData.slice();

    films.sort((a, b) => {
      return b.rating - a.rating;
    });

    return films.slice(0, MAX_CARDS_TOP);
  }

  _getTopCommented() {
    const films = this._filmsData.slice();

    films.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });

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
        films: this._getTopRated()
      },
      {
        type: `extra`,
        title: `Most commented`,
        films: this._getTopCommented()
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

  _getTmpl() {
    return (
      `<section class="films"></section>`
    );
  }
}
