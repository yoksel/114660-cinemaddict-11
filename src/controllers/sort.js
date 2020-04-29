import Sort from '../components/sort';
import {renderElement, replaceElement} from '../helpers';
import {SortType} from '../constants';

export default class SortController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._currentSort = SortType.DEFAULT;

    this._onSortChange = this._onSortChange.bind(this);
  }

  _onSortChange(sort) {
    this._filmsModel.setSortType(sort);
    this._currentSort = sort;
  }

  render() {
    const oldSortComponent = this._sortComponent;
    this._sortComponent = new Sort(this._currentSort);

    this._sortComponent.setClickHandler(this._onSortChange);

    if (oldSortComponent) {
      replaceElement(oldSortComponent, this._sortComponent);
    } else {
      renderElement(this._container, this._sortComponent);
    }
  }
}
