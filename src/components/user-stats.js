import {createElement} from '../helpers';

export default class UserStats {
  constructor({status, avatar, watchedQuantity, watchedDuration, topGenre}) {
    this.status = status;
    this.avatar = avatar;
    this.watchedQuantity = watchedQuantity;
    this.watchedDuration = watchedDuration;
    this.topGenre = topGenre;
  }

  getRank() {
    return (
      `<p class="statistic__rank">
        Your rank

        <img
          class="statistic__img"
          src="images/${this.avatar}"
          alt="Avatar"
          width="35" height="35">
        <span class="statistic__rank-label">${this.status}</span>
      </p>`
    );
  }

  getFilterItems() {
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

    return itemsData.reduce((prev, item, index) => {
      const {value, text} = item;
      const checkedAttr = index === 0 ? `checked` : ``;

      return `${prev} <input
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
      >${text}</label>`;
    }, ``);
  }

  getFilter() {
    return (
      `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${this.getFilterItems()}
      </form>`
    );
  }

  getStatValues(values) {
    return values.reduce((prev, {value, desc}) => {
      desc = desc ? `<span class="statistic__item-description">${desc}</span>` : ``;
      return `${prev}${value}${desc}`;
    }, ``);
  }

  getStatisticsItems() {
    const itemsData = [
      {
        name: `You watched`,
        values: [
          {
            value: this.watchedQuantity,
            desc: `movies`
          }
        ]
      },
      {
        name: `Total duration`,
        values: [
          {
            value: this.watchedDuration.hours,
            desc: `h`
          },
          {
            value: this.watchedDuration.mins,
            desc: `m`
          }
        ]
      },
      {
        name: `Top genre`,
        values: [{
          value: this.topGenre
        }]
      },
    ];

    return itemsData.reduce((prev, item) => {
      const {name, values} = item;

      return `${prev}<li class="statistic__text-item">
        <h4 class="statistic__item-title">${name}</h4>
        <p class="statistic__item-text">${this.getStatValues(values)}</p>
      </li>`;
    }, ``);
  }

  getElement() {
    const markup = `<section class="statistic" hidden>
      ${this.getRank()}

      ${this.getFilter()}

      <ul class="statistic__text-list">
        ${this.getStatisticsItems()}
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`;

    return createElement(markup);
  }
}
