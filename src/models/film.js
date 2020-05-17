const DESC_LENGTH = 140;

const getShortDesc = (desc) => {
  if (desc.length <= DESC_LENGTH) {
    return desc;
  }

  desc = desc
    .substr(0, DESC_LENGTH - 1)
    .trim()
    .replace(/,$/g, ``);

  return `${desc}&hellip;`;
};

export default class Film {
  constructor(filmData) {
    const filmInfo = filmData.film_info;
    const userDetails = filmData.user_details;

    this.id = filmData.id;
    this.poster = filmInfo.poster;
    this.title = filmInfo.title;
    this.origTitle = filmInfo.alternative_title;
    this.desc = filmInfo.description;
    this.shortDesc = getShortDesc(this.desc);
    this.genres = filmInfo.genre;
    this.releaseDate = new Date(filmInfo.release.date);
    this.country = filmInfo.release.release_country;
    this.runtime = filmInfo.runtime;
    this.rating = filmInfo.total_rating;
    this.ageRating = filmInfo.age_rating;
    this.director = filmInfo.director;
    this.writers = filmInfo.writers;
    this.actors = filmInfo.actors;
    this.isInWatchList = userDetails.watchlist;
    this.isWatched = userDetails.already_watched;
    this.isFavorite = userDetails.favorite;
    this.watchedDate = new Date(userDetails.watching_date);
    this.comments = filmData.comments;
    this.commentsData = this._convertComments(filmData.comments_data);
  }

  _convertComments(comments = []) {
    if (comments.length === 0) {
      return [];
    }

    return comments.map(({
      id,
      author,
      comment: text,
      emotion: emoji,
      date
    }) => {
      return {
        id,
        author,
        text,
        emoji,
        date: new Date(date)
      };
    });
  }

  toRaw() {
    return {
      'id': this.id,
      'film_info': {
        'poster': this.poster,
        'title': this.title,
        'alternative_title': this.origTitle,
        'description': this.desc,
        'genre': this.genres,
        'release': {
          'date': this.releaseDate.toISOString(),
          'release_country': this.country
        },
        'runtime': this.runtime,
        'actors': this.actors,
        'total_rating': this.rating,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writers
      },
      'user_details': {
        'watchlist': this.isInWatchList,
        'already_watched': this.isWatched,
        'watching_date': this.watchedDate.toISOString(),
        'favorite': this.isFavorite
      },
      'comments': this.comments,
      'comments_data': this._commentsToRaw(this.commentsData)
    };
  }

  commentToRaw({id, author, text: comment, emoji: emotion, date}) {
    return {
      id,
      author,
      comment,
      emotion,
      date: date.toISOString()
    };
  }

  _commentsToRaw(comments) {
    return comments.map(this.commentToRaw);
  }

  static parseFilm(filmData) {
    return new Film(filmData);
  }

  static parseFilms(filmData) {
    return filmData.map(Film.parseFilm);
  }

  static clone(filmData) {
    return new Film(filmData.toRaw());
  }
}
