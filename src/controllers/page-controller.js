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
    const filmsBoard = new FilmsBoard(cardsData);
    const sort = new Sort();

    sort.setClickHandler(filmsBoard.changeUpcomingSorting);

    renderElement(this._container, [
      filter,
      sort,
      filmsBoard
    ]);
  }
}
