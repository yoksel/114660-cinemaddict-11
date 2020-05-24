import {getWatched, getUserStatus} from '../helpers';

export default class User {
  constructor(filmsModel) {
    this._user = null;
    this._filmsModel = filmsModel;
    this._user = {
      avatar: `./images/bitmap@2x.png`
    };

    this._setUserStatus();

    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.addDataChangeHandler(this._onDataChange);
    this._filmsModel.addDataAddHandler(this._onDataChange);
  }

  getUser() {
    return this._user;
  }

  _setUserStatus() {
    const watched = getWatched(this._filmsModel.getFilms());
    this._user.status = getUserStatus(watched.length);
  }

  _onDataChange() {
    this._setUserStatus();
  }
}
