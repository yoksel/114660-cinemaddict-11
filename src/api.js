import Film from './models/film';

const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else if (response.status === 404) {
    throw new Error(`${response.status}: ${response.statusText}`);
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

  updateFilm(id, filmData) {
    const headers = new Headers();
    headers.append(`Content-Type`, `application/json`);

    return this._load({
      url: `movies/${id}`,
      headers,
      method: `PUT`,
      body: JSON.stringify(filmData.toRaw()),
    })
      .then((response) => response.json())
      .then((movieJson) => this._getCommentsPromise(movieJson))
      .then(Film.parseFilm);
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
