import Film from '../models/film';

const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  _getCommentsPromise(movieItem) {
    return new Promise((resolve, reject) => {
      this._load({url: `comments/${movieItem.id}`})
        .then((response) => response.json())
        .then((commentsJson) => {
          movieItem[`comments_data`] = commentsJson;

          resolve(movieItem);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((moviesJson) => {
        const commentsPromises = moviesJson.reduce((prev, movieItem) => {
          const commentPromise = this._getCommentsPromise(movieItem);
          prev.push(commentPromise);
          return prev;
        }, []);

        return Promise.all(commentsPromises);
      })
      .then(Film.parseFilms);
  }

  updateFilm(filmId, filmData) {
    const headers = new Headers({'Content-Type': `application/json`});

    return this._load({
      url: `movies/${filmId}`,
      headers,
      method: `PUT`,
      body: JSON.stringify(filmData.toRaw()),
    })
      .then((response) => response.json())
      .then((movieJson) => this._getCommentsPromise(movieJson))
      .then(Film.parseFilm);
  }

  addComment(filmData, commentData) {
    const headers = new Headers({'Content-Type': `application/json`});

    return this._load({
      url: `comments/${filmData.id}`,
      headers,
      method: `POST`,
      body: JSON.stringify(filmData.commentToRaw(commentData)),
    })
      .then((response) => response.json())
      .then(({movie: movieJson}) => this._getCommentsPromise(movieJson))
      .then(Film.parseFilm);
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: `DELETE`,
    });
  }

  sync(films) {
    const headers = new Headers({'Content-Type': `application/json`});

    return this._load({
      url: `movies/sync`,
      method: `POST`,
      body: JSON.stringify(films),
      headers
    })
      .then((response) => response.json());
  }

  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${END_POINT}/${url}`, {
      method,
      headers,
      body
    })
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
}
