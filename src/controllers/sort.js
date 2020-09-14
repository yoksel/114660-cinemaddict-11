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

  hide() {
    this._sortComponent.hide();
  }

  show() {
    this._sortComponent.show();
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

  _setSortType(sortType) {
    if (this._currentSort === sortType) {
      return;
    }

    this._filmsModel.setSortType(sortType);
    this._currentSort = sortType;
  }

  _onSortChange() {
    const newSort = this._filmsModel.getSortType();

    if (newSort === this._currentSort) {
      return;
    }

    this._currentSort = newSort;
    this.render();
  }
}
