import AbstractComponent from './abstract-component';

export default class Profile extends AbstractComponent {
  constructor({status, avatar}) {
    super();

    this._status = status;
    this._avatar = avatar;
  }

  _getTmpl() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._status}</p>

        <img
          class="profile__avatar"
          src="images/${this._avatar}"
          alt="Avatar"
          width="35" height="35">
      </section>`
    );
  }
}
