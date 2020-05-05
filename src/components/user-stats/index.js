import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import AbstractSmartComponent from '../abstract-smart-component';
import StatisticsList from './statistics-list';
import Filter from './filter';
import {createElement, renderElement} from "../../helpers";
import {CHART_OPTIONS} from "./constants";

export default class UserStats extends AbstractSmartComponent {
  constructor({userData, currentFilter}) {
    super();

    const {status, avatar, watchedByGenre} = userData;
    this._currentFilter = currentFilter;
    this._status = status;
    this._avatar = avatar;
    this._watchedByGenre = watchedByGenre;

    this._statisticsList = new StatisticsList(userData);
    this._filter = new Filter(this._currentFilter);
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

  setFilterClickHandler(handler) {
    this._filter.setClickHandler(handler);
  }

  _initChart(element) {
    const BAR_HEIGHT = 50;
    const statisticCtx = element.querySelector(`.statistic__chart`);
    const labels = Object.keys(this._watchedByGenre);
    const data = Object.values(this._watchedByGenre);

    statisticCtx.height = BAR_HEIGHT * labels.length;

    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: CHART_OPTIONS
    });
  }

  _getChart() {
    if (Object.values(this._watchedByGenre).length === 0) {
      return null;
    }

    const markup = `<div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>`;

    const element = createElement(markup);
    this._initChart(element);

    return element;
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    renderElement(element, this._filter);
    renderElement(element, this._statisticsList);
    renderElement(element, this._getChart());

    return element;
  }

  _getTmpl() {
    return (
      `<section class="statistic">
        ${this._getRank()}
      </section>`
    );
  }
}
