import AbstractComponent from './abstract-component';

export default class showMoreBtn extends AbstractComponent {
  _getTmpl() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  setClickHandler(handler) {
    this._element.addEventListener(`click`, handler);
  }
}
