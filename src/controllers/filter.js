import Filter from '../components/filter';
import {renderElement, replaceElement} from '../helpers';

export default class FilterController {
  constructor(container, clickHandler) {
    this._container = container;
    this._clickHandler = clickHandler;
    this._currentFilter = `all`;
  }

  reset() {
    this._filterComponent.reset();
  }

  setCurrentFilter(filter) {
    this._currentFilter = filter;
  }

  render(filmsData) {
    const oldFilterComponent = this._filterComponent;
    this._filterComponent = new Filter(filmsData, this._currentFilter);

    this._filterComponent.setClickHandler(this._clickHandler);

    if (oldFilterComponent) {
      replaceElement(oldFilterComponent, this._filterComponent);
    } else {
      renderElement(this._container, this._filterComponent);
    }
  }
}
