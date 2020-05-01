import Sort from '../components/sort';
import {renderElement, replaceElement} from '../helpers';
import {SortType} from '../constants';

export default class SortController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._currentSort = SortType.DEFAULT;

    this._setSortType = this._setSortType.bind(this);
  }

  _setSortType(sortType) {
    this._filmsModel.setSortType(sortType);
    this._currentSort = sortType;
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
