import AbstractComponent from './abstract-component';

export default class showMoreBtn extends AbstractComponent {
  _getTmpl() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  hideElement(isHidden) {
    this.getElement().hidden = isHidden;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
