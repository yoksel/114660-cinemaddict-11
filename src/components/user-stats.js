import {createElement} from '../helpers';

export default class UserStats {
  constructor({userData, currentFilter}) {
    const {status, avatar, watchedQuantity, watchedDuration, topGenre} = userData;
    this._currentFilter = currentFilter || `all-time`;
    this._status = status;
    this._avatar = avatar;
    this._watchedQuantity = watchedQuantity;
    this._watchedDuration = watchedDuration;
    this._topGenre = topGenre;

    this._element = createElement(this._getTmpl());
  }

  _getRank() {
    return (
      `<p class="statistic__rank">
        Your rank

        <img
          class="statistic__img"
          src="images/${this._avatar}"
          alt="Avatar"
          width="35" height="35">
        <span class="statistic__rank-label">${this._status}</span>
      </p>`
    );
  }

  _getFilterItems() {
    const itemsData = [
      {
        value: `all-time`,
        text: `All time`
      },
      {
        value: `today`,
        text: `Today`
      },
      {
        value: `week`,
        text: `Week`
      },
      {
        value: `month`,
        text: `Month`
      },
      {
        value: `year`,
        text: `Year`
      },
    ];

    return itemsData.reduce((prev, {value, text}) => {
      const checkedAttr = value === this._currentFilter ? `checked` : ``;

      return (
        `${prev} <input
          type="radio"
          class="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-${value}"
          value="${value}"
          ${checkedAttr}
        >
        <label
          for="statistic-${value}"
          class="statistic__filters-label"
        >${text}</label>`
      );
    }, ``);
  }

  _getFilter() {
    return (
      `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${this._getFilterItems()}
      </form>`
    );
  }

  _getStatValues(values) {
    return values.reduce((prev, {value, desc}) => {
      desc = desc ? `<span class="statistic__item-description">${desc}</span>` : ``;
      return (
        `${prev}${value}${desc}`
      );
    }, ``);
  }

  _getStatisticsItems() {
    const itemsData = [
      {
        name: `You watched`,
        values: [
          {
            value: this._watchedQuantity,
            desc: `movies`
          }
        ]
      },
      {
        name: `Total duration`,
        values: [
          {
            value: this._watchedDuration.hours,
            desc: `h`
          },
          {
            value: this._watchedDuration.mins,
            desc: `m`
          }
        ]
      },
      {
        name: `Top genre`,
        values: [{
          value: this._topGenre
        }]
      },
    ];

    return itemsData.reduce((prev, item) => {
      const {name, values} = item;

      return (
        `${prev}<li class="statistic__text-item">
          <h4 class="statistic__item-title">${name}</h4>
          <p class="statistic__item-text">${this._getStatValues(values)}</p>
        </li>`
      );
    }, ``);
  }

  _getTmpl() {
    return (
      `<section class="statistic" hidden>
        ${this._getRank()}

        ${this._getFilter()}

        <ul class="statistic__text-list">
          ${this._getStatisticsItems()}
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>`
    );
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
