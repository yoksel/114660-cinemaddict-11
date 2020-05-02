import CardComponent from '../components/card';
import DetailsComponent from '../components/details';
import {renderElement, removeElement, replaceElement} from '../helpers';

export default class FilmController {
  constructor(container, onDataChange, onViewChange, setOpenedID) {
    this._container = container;

    this._cardComponent = null;
    this._detailsComponent = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._setOpenedID = setOpenedID;
    this._showDetails = this._showDetails.bind(this);
    this._hideDetails = this._hideDetails.bind(this);
    this._toggleProp = this._toggleProp.bind(this);
    this._updateComments = this._updateComments.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._detaislIsOpened = false;
  }

  setDefaultView() {
    this._hideDetails();
    this._detailsComponent.reset();
    this._detaislIsOpened = false;
    this._setOpenedID();
  }

  destroy() {
    this._detailsComponent.removeEvents();
    removeElement(this._cardComponent);
    removeElement(this._detailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _showDetails() {
    this._onViewChange();
    renderElement(document.body, this._detailsComponent);
    this._setDetailsHandlers();
    this._detaislIsOpened = true;
    this._setOpenedID(this.filmData.id);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _hideDetails() {
    this._detailsComponent.removeEvents();
    removeElement(this._detailsComponent);
    this._detaislIsOpened = false;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _toggleProp(prop) {
    const newFilmData = Object.assign(
        {},
        this.filmData,
        {[prop]: !this.filmData[prop]}
    );
    this._onDataChange(this.filmData, newFilmData);
  }

  _updateComments(id, newData) {
    const comments = this.filmData.comments;
    let newComments = [];

    if (newData === null) {
      // deletion
      newComments = comments.filter((comment) => comment.id !== id);
    } else if (id === null) {
      newComments = comments.concat([newData]);
      this._detailsComponent.setEmoji();
    }

    const newFilmData = Object.assign(
        {},
        this.filmData,
        {comments: newComments}
    );

    this._onDataChange(this.filmData, newFilmData);
  }

  _onEscKeyDown(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      this._hideDetails();
    }
  }

  _setCardHandlers() {
    this._cardComponent.setCardClickHandler(this._showDetails);
    this._cardComponent.setControlsClickHandler(this._toggleProp);
  }

  _setDetailsHandlers() {
    this._detailsComponent.setCloseBtnClickHandler(this._hideDetails);
    this._detailsComponent.setControlsClickHandler(this._toggleProp);
    this._detailsComponent.setCommentsActionsHandler(this._updateComments);
  }

  render(filmData) {
    this.filmData = filmData;
    const oldCardComponent = this._cardComponent;
    const oldDetailsComponent = this._detailsComponent;
    if (this._detailsComponent) {
      this._detailsComponent.removeEvents();
    }
    this._cardComponent = new CardComponent(filmData);
    this._detailsComponent = new DetailsComponent(filmData);

    this._setCardHandlers();

    if (oldCardComponent) {
      replaceElement(oldCardComponent, this._cardComponent);

      if (this._detaislIsOpened) {
        this._setDetailsHandlers();
        replaceElement(oldDetailsComponent, this._detailsComponent);
      }
    } else {
      renderElement(this._container, this._cardComponent);
    }
  }
}
