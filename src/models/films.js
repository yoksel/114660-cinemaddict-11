import {FilterType, SortType} from '../constants';
import {getFilmsByFilter, getFilmsSortedByProp} from '../helpers';

export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getFilms() {
    let films = getFilmsByFilter(this._films, this._activeFilterType);
    films = getFilmsSortedByProp(films, this._activeSortType);

    return films;
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = films;
  }

  setFilterType(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  getFilterType() {
    return this._activeFilterType;
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortChangeHandlers);
  }

  addDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  addFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  addSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  updateFilm(id, newData) {
    const filmIndex = this._films.findIndex((item) => id === item.id);

    if (filmIndex < 0) {
      return false;
    }

    this._films[filmIndex] = newData;

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
