import AbstractComponent from '../abstract-component';

import {AGE_RATINGS} from '../../constants';

export default class Poster extends AbstractComponent {
  constructor({poster, ageRating}) {
    super();

    this._poster = poster;
    this._ageRating = ageRating;
  }

  _getTmpl() {
    return (
      `<div class="film-details__poster">
        <img class="film-details__poster-img" src="./${this._poster}" alt="">

        <p class="film-details__age" title="${AGE_RATINGS[this._ageRating]}">${this._ageRating}</p>
      </div>`
    );
  }
}
