import FilmModel from '../models/film';
import ConnectionObserver from '../connection-observer';
const {isOnline} = new ConnectionObserver();

const createStoreStructure = (films) => {
  return films.reduce((prev, film) => {
    prev[film.id] = film;

    return prev;
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films)=> {
          const storeItems = createStoreStructure(films);

          this._store.setItems(storeItems);

          return FilmModel.parseFilms(films);
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(FilmModel.parseFilms(storeFilms));
  }

  updateFilm(filmId, filmData) {
    if (isOnline()) {
      return this._api.updateFilm(filmId, filmData)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, newFilm);

          return FilmModel.parseFilm(newFilm);
        });
    }

    const localFilm = FilmModel.clone(filmData);

    this._store.setItem(filmId, localFilm.toRaw());

    return Promise.resolve(localFilm);
  }

  addComment(filmData, commentData) {
    if (isOnline()) {
      return this._api.addComment(filmData, commentData)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, newFilm);

          return FilmModel.parseFilm(newFilm);
        });
    }

    return Promise.reject(`Adding comments is not allowed offline`);
  }

  deleteComment(filmId, commentId) {
    if (isOnline()) {
      return this._api.deleteComment(commentId)
        .then((response) => {
          const film = this._store.getItem(filmId);
          film[`comments`] = film.comments.filter((id) => id !== commentId);
          film[`comments_data`] = film.comments_data.filter((comment) => comment.id !== commentId);

          this._store.setItem(filmId, film);

          return response;
        });
    }

    return Promise.reject(`Deleting comments is not allowed offline`);
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((films) => {
          const storeItems = createStoreStructure(films);

          this._store.setItems(storeItems);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
