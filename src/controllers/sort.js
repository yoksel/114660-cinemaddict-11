import Sort from '../components/sort';
import {renderElement, replaceElement} from '../helpers';
import {SortType} from '../constants';

export default class SortController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._currentSort = SortType.DEFAULT;

    this._setSortType = this._setSortType.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    this._filmsModel.addSortChangeHandler(this._onSortChange);
  }

  _setSortType(sortType) {
    this._filmsModel.setSortType(sortType);
  }

  _onSortChange() {
    this._currentSort = this._filmsModel.getSortType();
    this.render();
  }

  render() {
    const oldSortComponent = this._sortComponent;
    this._sortComponent = new Sort(this._currentSort);

    this._sortComponent.setClickHandler(this._setSortType);

    if (oldSortComponent) {
      replaceElement(oldSortComponent, this._sortComponent);
    } else {
      renderElement(this._container, this._sortComponent);
    }
  }
}
