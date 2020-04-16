import FilmsList from './films-list';
import {createElement} from '../helpers';
import {MAX_CARDS_TOP} from '../constants';

export default class Films {
  constructor(data) {
    this._data = data;
  }

  _getTopRated() {
    const films = this._data.slice();

    films.sort((a, b) => {
      return b.rating - a.rating;
    });

    return films.slice(0, MAX_CARDS_TOP);
  }

  _getTopCommented() {
    const films = this._data.slice();

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
        films: this._data
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
      const filmsSection = new FilmsList(section);
      element.append(filmsSection.getElement());
    }

    return element;
  }

  _getTmpl() {
    return (
      `<section class="films"></section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = this._createElement();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
