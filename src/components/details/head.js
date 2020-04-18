import AbstractComponent from '../abstract-component';

export default class Head extends AbstractComponent {
  constructor({title, origTitle, rating}) {
    super();

    this._title = title;
    this._origTitle = origTitle;
    this._rating = rating;
  }

  _getTmpl() {
    return (
      `<div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${this._title}</h3>
          <p class="film-details__title-original">Original: ${this._origTitle}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${this._rating}</p>
        </div>
      </div>`
    );
  }
}
