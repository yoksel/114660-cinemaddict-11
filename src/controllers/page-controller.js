import Filter from '../components/filter';
import Sort from '../components/sort';
import FilmsBoard from '../components/films-board';

import {renderElement} from '../helpers';

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(cardsData) {
    const filter = new Filter({cardsData, currentFilter: `all`});
    const sort = new Sort();
    const filmsBoard = new FilmsBoard(cardsData);

    renderElement(this._container, filter);
    renderElement(this._container, sort);
    renderElement(this._container, filmsBoard);
  }
}
