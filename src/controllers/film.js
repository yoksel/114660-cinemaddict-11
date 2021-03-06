import CardComponent from '../components/card';
import DetailsComponent from '../components/details';
import {renderElement, removeElement, replaceElement} from '../helpers';
import {FilterType, FILTERS} from '../constants';
import FilmModel from "../models/film.js";

export default class FilmController {
  constructor({container, api, filmsModel, onDataChangeSuccess, onViewChange, onDetailsClose}) {
    this._container = container;
    this._api = api;
    this._filmsModel = filmsModel;

    this._cardComponent = null;
    this._detailsComponent = null;

    this._selectedEmoji = null;
    this._commentText = ``;

    this._onDataChangeSuccess = onDataChangeSuccess;
    this._onViewChange = onViewChange;
    this._onDetailsClose = onDetailsClose;
    this._showDetails = this._showDetails.bind(this);
    this._hideDetails = this._hideDetails.bind(this);
    this._toggleProp = this._toggleProp.bind(this);
    this._updateComments = this._updateComments.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._getEmoji = this._getEmoji.bind(this);
    this._setEmoji = this._setEmoji.bind(this);
    this._getText = this._getText.bind(this);
    this._setText = this._setText.bind(this);
    this._resetComment = this._resetComment.bind(this);

    this.detailsIsOpened = false;
  }

  setDefaultView() {
    if (!this.detailsIsOpened) {
      return;
    }

    this._hideDetails();
    this.detailsIsOpened = false;
  }

  destroy() {
    removeElement(this._cardComponent);
    this._detailsComponent.removeEvents();
    removeElement(this._detailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  render(filmData) {
    this.filmData = filmData;
    const oldCardComponent = this._cardComponent;
    const oldDetailsComponent = this._detailsComponent;
    if (this._detailsComponent) {
      this._detailsComponent.removeEvents();
    }
    this._cardComponent = new CardComponent(this.filmData);
    this._detailsComponent = new DetailsComponent({
      filmData: this.filmData,
      setEmoji: this._setEmoji,
      getEmoji: this._getEmoji,
      setText: this._setText,
      getText: this._getText
    });

    this._setCardHandlers();

    if (oldCardComponent) {
      replaceElement(oldCardComponent, this._cardComponent);

      if (this.detailsIsOpened) {
        this._setDetailsHandlers();
        replaceElement(oldDetailsComponent, this._detailsComponent);
      }
    } else {
      renderElement(this._container, this._cardComponent);
    }
  }

  _showDetails() {
    this._onViewChange();
    renderElement(document.body, this._detailsComponent);
    this._setDetailsHandlers();
    this.detailsIsOpened = true;

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _hideDetails() {
    if (this._onDetailsClose) {
      this._onDetailsClose();
    }

    this._resetComment();
    this._detailsComponent.removeEvents();
    removeElement(this._detailsComponent);
    this.detailsIsOpened = false;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _setWatchedDate(prop, newFilmData) {
    const watchedPropName = FILTERS[FilterType.HISTORY].propName;
    const isDateNeeded = prop === watchedPropName
      && newFilmData[prop]
      && !newFilmData.watchedDate;

    if (isDateNeeded) {
      // Film was marked as watched but it has no date
      newFilmData.watchedDate = new Date();
    }
  }

  _toggleProp(prop) {
    const newFilmData = FilmModel.clone(this.filmData);
    newFilmData[prop] = !newFilmData[prop];
    this._setWatchedDate(prop, newFilmData);

    this._api.updateFilm(this.filmData.id, newFilmData)
      .then((filmModel) => this._updateFilmInModel(this.filmData, filmModel));
  }

  _setEmoji(emoji = ``) {
    this._selectedEmoji = emoji;
  }

  _getEmoji() {
    return this._selectedEmoji;
  }

  _setText(text = ``) {
    this._commentText = text;
  }

  _getText() {
    return this._commentText;
  }

  _resetComment() {
    this._selectedEmoji = null;
    this._commentText = ``;

    this._detailsComponent.resetComment();
  }

  _updateFilmInModel(oldFilmData, newFilmData) {
    const isSuccess = this._filmsModel.updateFilm(oldFilmData.id, newFilmData);

    if (!isSuccess) {
      return;
    }

    this._onDataChangeSuccess(oldFilmData, newFilmData);
  }

  _updateComments(id, newCommentData) {
    const {comments, commentsData} = this.filmData;

    if (newCommentData === null) {
      // delete comment
      this._api.deleteComment(this.filmData.id, id)
        .then(() => {
          const newComments = comments.filter((commentId) => commentId !== id);
          const newCommentsData = commentsData.filter((comment) => comment.id !== id);

          const newFilmData = FilmModel.clone(this.filmData);
          newFilmData.comments = newComments;
          newFilmData.commentsData = newCommentsData;

          this._updateFilmInModel(this.filmData, newFilmData);
        })
        .catch(() => {
          this._detailsComponent.highlightCommentOnError(id);
        });

    } else if (id === null) {
      // add comment
      this._api.addComment(this.filmData, newCommentData)
        .then((filmModel) => {
          this._resetComment();
          this._updateFilmInModel(this.filmData, filmModel);
        })
        .catch(() => {
          this._detailsComponent.highlightFormOnError();
        });
    }
  }

  _setCardHandlers() {
    this._cardComponent.setCardClickHandler(this._showDetails);
    this._cardComponent.setControlsClickHandler(this._toggleProp);
  }

  _setDetailsHandlers() {
    this._detailsComponent.setCloseButtonClickHandler(this._hideDetails);
    this._detailsComponent.setControlsClickHandler(this._toggleProp);
    this._detailsComponent.setCommentsActionsHandler(this._updateComments);
  }

  _onEscKeyDown(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      this._hideDetails();
    }
  }
}
