import UserStats from '../components/user-stats';
import {renderElement, replaceElement, getFilmsByFilter, getTotalDuration, getWatchedByGenre, getWatchedByPeriod} from '../helpers';
import {FilterType, StatsFilter} from '../constants';

export default class UserStatsController {
  constructor(container, filmsModel, userModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._userModel = userModel;
    this._currentFilter = StatsFilter.ALL_TIME;

    this._onDataChange = this._onDataChange.bind(this);
    this._setPeriod = this._setPeriod.bind(this);

    this._filmsModel.addDataChangeHandler(this._onDataChange);
  }

  hide() {
    this._userStatsComponent.hide();
  }

  show() {
    this._userStatsComponent.show();
  }

  _onDataChange() {
    this.render();
    this.hide();
  }

  _setPeriod(periodName) {
    this._currentFilter = periodName;
    this.render();
  }

  _getUserData() {
    const {status, avatar} = this._userModel.getUser();
    const watched = getFilmsByFilter(this._filmsModel.getFilmsAll(), FilterType.HISTORY);
    const watchedByPeriod = getWatchedByPeriod(watched, this._currentFilter);
    const watchedDuration = getTotalDuration(watchedByPeriod);
    const watchedByGenre = getWatchedByGenre(watchedByPeriod);
    const watchedQuantity = watchedByPeriod.length;
    const topGenre = Object.keys(watchedByGenre)[0];

    return {
      status,
      avatar,
      watchedQuantity,
      watchedDuration,
      watchedByGenre,
      topGenre
    };
  }

  render() {
    const oldUserStatsComponent = this._userStatsComponent;
    this._userStatsComponent = new UserStats({
      userData: this._getUserData(),
      currentFilter: this._currentFilter
    });
    this._userStatsComponent.setFilterClickHandler(this._setPeriod);

    if (oldUserStatsComponent) {
      replaceElement(oldUserStatsComponent, this._userStatsComponent);
    } else {
      renderElement(this._container, this._userStatsComponent);
    }
  }
}
