import CardComponent from '../components/card';
import DetailsComponent from '../components/details';
import {renderElement, removeElement, replaceElement} from '../helpers';

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._cardComponent = null;
    this._detailsComponent = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._showDetails = this._showDetails.bind(this);
    this._hideDetails = this._hideDetails.bind(this);
    this._toggleProp = this._toggleProp.bind(this);

    this._detaislIsOpened = false;
  }

  setDefaultView() {
    this._hideDetails();
    this._detailsComponent.reset();
    this._detaislIsOpened = false;
  }

  _showDetails() {
    this._onViewChange();
    renderElement(document.body, this._detailsComponent);
    this._setDetailsHandlers();
    this._detaislIsOpened = true;
  }

  _hideDetails() {
    removeElement(this._detailsComponent);
    this._detaislIsOpened = false;
  }

  _toggleProp(prop) {
    const newFilmData = Object.assign(
        {},
        this.filmData,
        {[prop]: !this.filmData[prop]}
    );
    this._onDataChange(this.filmData, newFilmData);
  }

  _setCardHandlers() {
    this._cardComponent.setCardClickHandler(this._showDetails);
    this._cardComponent.setControlsClickHandler(this._toggleProp);
  }

  _setDetailsHandlers() {
    this._detailsComponent.setCloseBtnClickHandler(this._hideDetails);
    this._detailsComponent.setControlsClickHandler(this._toggleProp);
  }

  render(filmData) {
    this.filmData = filmData;
    const oldCardComponent = this._cardComponent;
    const oldDetailsComponent = this._detailsComponent;
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
