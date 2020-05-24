import AbstractSmartComponent from './abstract-smart-component';

export default class showMoreButton extends AbstractSmartComponent {
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  _getTmpl() {
    return (
      `<button class="films-list__show-more" hidden>Show more</button>`
    );
  }
}
