import Filter from '../components/filter';
import {renderElement, replaceElement} from '../helpers';
import {FilterType} from '../constants';

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._currentFilter = FilterType.ALL;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(filter) {
    this._filmsModel.setFilterType(filter);
    this._currentFilter = filter;
  }

  render() {
    const oldFilterComponent = this._filterComponent;
    this._filterComponent = new Filter(this._filmsModel.getFilmsAll(), this._currentFilter);

    this._filterComponent.setClickHandler(this._onFilterChange);

    if (oldFilterComponent) {
      replaceElement(oldFilterComponent, this._filterComponent);
    } else {
      renderElement(this._container, this._filterComponent);
    }
  }
}
