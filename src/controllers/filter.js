import Filter from '../components/filter';
import {renderElement, replaceElement} from '../helpers';
import {FilterType} from '../constants';

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._currentFilter = FilterType.ALL;

    this._setFilterType = this._setFilterType.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.addDataChangeHandler(this._onDataChange);
    this._filmsModel.addFilterChangeHandler(this._onFilterChange);
  }

  setStatsClickHandler(handler) {
    this._filterComponent.setStatsClickHandler(handler);
    this._statsClickHandler = handler;
  }

  setFilterItemClickHandler(handler) {
    this._filterComponent.setFilterItemClickHandler(handler);
    this._filterItemClickHandler = handler;
  }

  setActiveHighlight(section) {
    this._filterComponent.setActiveHighlight(section);
  }

  _setFilterType(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filmsModel.setFilterType(filterType);
    this._currentFilter = filterType;
  }

  _recoveryListeners() {
    this.setFilterItemClickHandler(this._filterItemClickHandler);
    this.setStatsClickHandler(this._statsClickHandler);
  }

  _onDataChange() {
    this.render();
    this._recoveryListeners();
  }

  _onFilterChange() {
    const newFilter = this._filmsModel.getFilterType();

    if (newFilter === this._currentFilter) {
      return;
    }

    this._currentFilter = newFilter;
    this.render();
    this._recoveryListeners();
  }

  render() {
    const oldFilterComponent = this._filterComponent;
    this._filterComponent = new Filter(this._filmsModel.getFilmsAll(), this._currentFilter);

    this._filterComponent.setFilterSwitchHandler(this._setFilterType);

    if (oldFilterComponent) {
      replaceElement(oldFilterComponent, this._filterComponent);
    } else {
      renderElement(this._container, this._filterComponent);
    }
  }
}
