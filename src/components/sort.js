import {createElement} from '../helpers';

export default class Sort {
  getElement() {
    const markup = `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`;

    return createElement(markup);
  }
}
