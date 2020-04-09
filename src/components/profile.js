import {createElement} from '../helpers';

export default class Profile {
  constructor({status, avatar}) {
    this.status = status;
    this.avatar = avatar;
  }

  getElement() {
    return createElement(
        `<section class="header__profile profile">
        <p class="profile__rating">${this.status}</p>

        <img
          class="profile__avatar"
          src="images/${this.avatar}"
          alt="Avatar"
          width="35" height="35">
      </section>`
    );
  }
}
