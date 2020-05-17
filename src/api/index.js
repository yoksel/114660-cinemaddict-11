const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

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
    const headers = new Headers({'Content-Type': `application/json`});

    return this._load({
      url: `movies/${filmId}`,
      headers,
      method: `PUT`,
      body: JSON.stringify(filmData.toRaw()),
    })
      .then((response) => response.json())
      .then((filmJson) => this._getCommentsPromise(filmJson));
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
      .then(({movie: filmJson}) => this._getCommentsPromise(filmJson));
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
    headers.append(`Authorization`, this._authorization);

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
