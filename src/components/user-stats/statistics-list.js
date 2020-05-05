import AbstractComponent from '../abstract-component';

export default class StatisticsList extends AbstractComponent {
  constructor({watchedQuantity, watchedDuration, topGenre}) {
    super();

    this._watchedQuantity = watchedQuantity;
    this._watchedDuration = watchedDuration;
    this._topGenre = topGenre || ``;
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
      `<ul class="statistic__text-list">
        ${this._getStatisticsItems()}
      </ul>`
    );
  }
}
