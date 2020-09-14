const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const CONTENT_TYPE_HEADER = {'Content-Type': `application/json`};

export default class API {
  constructor(endPoint, authorization) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  _getCommentsPromise(filmJson) {
    return new Promise((resolve, reject) => {
      this._load({url: `comments/${filmJson.id}`})
        .then((response) => response.json())
        .then((commentsJson) => {
          filmJson[`comments_data`] = commentsJson;

          resolve(filmJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((filmsJson) => {
        const commentsPromises = filmsJson.reduce((prev, filmItem) => {
          const commentPromise = this._getCommentsPromise(filmItem);
          prev.push(commentPromise);
          return prev;
        }, []);

        return Promise.all(commentsPromises);
      });
  }

  updateFilm(filmId, filmData) {
    return this._load({
      url: `movies/${filmId}`,
      headers: new Headers(CONTENT_TYPE_HEADER),
      method: `PUT`,
      body: JSON.stringify(filmData.toRaw()),
    })
      .then((response) => response.json())
      .then((filmJson) => this._getCommentsPromise(filmJson));
  }

  addComment(filmData, commentData) {
    return this._load({
      url: `comments/${filmData.id}`,
      headers: new Headers(CONTENT_TYPE_HEADER),
      method: `POST`,
      body: JSON.stringify(filmData.commentToRaw(commentData)),
    })
      .then((response) => response.json())
      .then(({movie: filmJson}) => this._getCommentsPromise(filmJson));
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: `DELETE`,
    });
  }

  sync(films) {
    return this._load({
      url: `movies/sync`,
      headers: new Headers(CONTENT_TYPE_HEADER),
      method: `POST`,
      body: JSON.stringify(films),
    })
      .then((response) => response.json())
      .then(({updated: filmsJson}) => {
        const commentsPromises = filmsJson.reduce((prev, filmItem) => {
          const commentPromise = this._getCommentsPromise(filmItem);
          prev.push(commentPromise);
          return prev;
        }, []);

        return Promise.all(commentsPromises);
      });
  }

  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.set(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {
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
