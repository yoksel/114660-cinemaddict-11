import FilmsList from './films-list';
import {MAX_CARDS_TOP} from '../const';
import {createElement} from '../helpers/createElement';

export default class Films {
  constructor(data) {
    this.data = data;
    this.elem = createElement(`<section class="films"></section>`);
  }

  getTopRated() {
    const films = this.data.slice();

    films.sort((a, b) => {
      return b.rating - a.rating;
    });

    return films.slice(0, MAX_CARDS_TOP);
  }

  getTopCommented() {
    const films = this.data.slice();

    films.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });

    return films.slice(0, MAX_CARDS_TOP);
  }

  getSectionsData() {
    return [
      {
        type: `upcoming`,
        title: `All movies. Upcoming`,
        films: this.data
      },
      {
        type: `extra`,
        title: `Top rated`,
        films: this.getTopRated()
      },
      {
        type: `extra`,
        title: `Most commented`,
        films: this.getTopCommented()
      }
    ];
  }

  getElement() {
    for (let section of this.getSectionsData()) {
      const filmsSection = new FilmsList(section);
      this.elem.append(filmsSection.getElement());
    }

    return this.elem;
  }
}
