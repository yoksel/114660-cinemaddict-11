import AbstractComponent from '../abstract-component';
import {getHandlerWithValue} from '../../helpers';
import {StatsFilter} from '../../constants';

export default class Filter extends AbstractComponent {
  constructor(currentFilter) {
    super();

    this._currentFilter = currentFilter || StatsFilter.ALL_TIME;
  }

  setClickHandler(handler) {
    const clickHandler = getHandlerWithValue(`.statistic__filters-input`, handler);
    this.getElement().addEventListener(`click`, clickHandler);
  }

  _getFilterItems() {
    const itemsData = [
      {
        value: StatsFilter.ALL_TIME,
        text: `All time`
      },
      {
        value: StatsFilter.TODAY,
        text: `Today`
      },
      {
        value: StatsFilter.WEEK,
        text: `Week`
      },
      {
        value: StatsFilter.MONTH,
        text: `Month`
      },
      {
        value: StatsFilter.YEAR,
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

  _getTmpl() {
    return (
      `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${this._getFilterItems()}
      </form>`
    );
  }
}
