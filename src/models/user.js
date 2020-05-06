import {getWatched, getUserStatus} from '../helpers';

export default class User {
  constructor(filmsModel) {
    this._user = null;
    this._filmsModel = filmsModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.addDataChangeHandler(this._onDataChange);
  }

  setUser(user) {
    this._user = Object.assign({}, user);
    this._setUserStatus();
  }

  getUser() {
    return this._user;
  }

  _setUserStatus() {
    const watched = getWatched(this._filmsModel.getFilms());
    const status = getUserStatus(watched.length);
    this._user.status = status;
  }

  _onDataChange() {
    this._setUserStatus();
  }
}
