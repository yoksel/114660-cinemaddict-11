import FilmsList from './films-list';
import {createElement} from '../helpers';
import {MAX_CARDS_TOP} from '../constants';

export default class Films {
  constructor(data) {
    this._data = data;
    this._element = createElement(`<section class="films"></section>`);

    this._addSections();
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

  _addSections() {
    for (const section of this._getSectionsData()) {
      const filmsSection = new FilmsList(section);
      this._element.append(filmsSection.getElement());
    }
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
