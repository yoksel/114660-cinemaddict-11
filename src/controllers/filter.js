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

    this._filmsModel.addDataChangeHandler(this._onDataChange);
  }

  _setFilterType(filterType) {
    this._filmsModel.setFilterType(filterType);
    this._currentFilter = filterType;
  }

  _onDataChange() {
    this.render();
  }

  render() {
    const oldFilterComponent = this._filterComponent;
    this._filterComponent = new Filter(this._filmsModel.getFilmsAll(), this._currentFilter);

    this._filterComponent.setClickHandler(this._setFilterType);

    if (oldFilterComponent) {
      replaceElement(oldFilterComponent, this._filterComponent);
    } else {
      renderElement(this._container, this._filterComponent);
    }
  }
}
