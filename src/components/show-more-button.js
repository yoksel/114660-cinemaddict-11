import AbstractComponent from './abstract-component';

export default class showMoreButton extends AbstractComponent {
  _getTmpl() {
    return (
      `<button class="films-list__show-more" hidden>Show more</button>`
    );
  }

  show() {
    this.getElement().hidden = false;
  }

  hide() {
    this.getElement().hidden = true;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
