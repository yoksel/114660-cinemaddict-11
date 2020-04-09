export default class UserStats {
  constructor({userData, cardsData}) {
    this.userData = userData;
    this.cardsData = cardsData;

    this.watched = this.cardsData.filter((item) => item.isWatched);
  }

  getRank() {
    return (
      `<p class="statistic__rank">
        Your rank

        <img
          class="statistic__img"
          src="images/${this.userData.avatar}"
          alt="Avatar"
          width="35" height="35">
        <span class="statistic__rank-label">${this.userData.status}</span>
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

  getTotalDuration() {
    const totalTimeMins = this.watched.reduce((prev, {runtime}) => {
      return prev + runtime.hours * 60 + runtime.mins;
    }, 0);

    const mins = totalTimeMins % 60;
    const hours = (totalTimeMins - mins) / 60;

    return {hours, mins};
  }

  getTopGenre() {
    if (this.watched.length === 0) {
      return `None`;
    }

    const countGenres = this.watched.reduce((prev, {genres}) => {
      for (const genre of genres) {
        if (!prev[genre]) {
          prev[genre] = 0;
        }

        prev[genre]++;
      }
      return prev;
    }, {});

    const genresList = Object.entries(countGenres);

    genresList.sort((a, b) => {
      return b[1] - a[1];
    });

    return genresList[0][0];
  }

  getStatisticsItems() {
    const totalDuration = this.getTotalDuration();

    const itemsData = [
      {
        name: `You watched`,
        values: [
          {
            value: this.watched.length,
            desc: `movies`
          }
        ]
      },
      {
        name: `Total duration`,
        values: [
          {
            value: totalDuration.hours,
            desc: `h`
          },
          {
            value: totalDuration.mins,
            desc: `m`
          }
        ]
      },
      {
        name: `Top genre`,
        values: [{
          value: this.getTopGenre()
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

  getTmpl() {
    return (
      `<section class="statistic" hidden>
        ${this.getRank()}

        ${this.getFilter()}

        <ul class="statistic__text-list">
          ${this.getStatisticsItems()}
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>

      </section>`
    );
  }
}
