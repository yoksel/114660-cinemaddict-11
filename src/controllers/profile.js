import ProfileComponent from '../components/profile';
import {renderElement, replaceElement} from '../helpers';

export default class Profile {
  constructor(container, filmsModel, userModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._userModel = userModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.addDataChangeHandler(this._onDataChange);
  }

  _onDataChange() {
    this.render();
  }

  render() {
    const oldProfileComponent = this._profileComponent;
    this._profileComponent = new ProfileComponent(this._userModel.getUser());

    if (oldProfileComponent) {
      replaceElement(oldProfileComponent, this._profileComponent);

    } else {
      renderElement(this._container, this._profileComponent);
    }
  }
}
