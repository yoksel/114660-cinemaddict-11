import AbstractSmartComponent from '../abstract-smart-component';
import StatsList from './stats-list';
import StatsPeriodsNav from './stats-periods-nav';
import {createElement, renderElement} from "../../helpers";
import {renderChart} from './render-chart';

export default class UserStats extends AbstractSmartComponent {
  constructor({userData, currentFilter}) {
    super();

    const {status, avatar, watchedByGenre} = userData;
    this._currentFilter = currentFilter;
    this._status = status;
    this._avatar = avatar;
    this._watchedByGenre = watchedByGenre;

    this._statsList = new StatsList(userData);
    this._statsPeriodsNav = new StatsPeriodsNav(this._currentFilter);
  }

  _getRank() {
    return (
      `<p class="statistic__rank">
        Your rank

        <img
          class="statistic__img"
          src="${this._avatar}"
          alt="Avatar"
          width="35" height="35">
        <span class="statistic__rank-label">${this._status}</span>
      </p>`
    );
  }

  setFilterClickHandler(handler) {
    this._statsPeriodsNav.setClickHandler(handler);
  }

  renderChart() {
    renderChart(this.getElement(), this._watchedByGenre);
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    renderElement(element, this._statsPeriodsNav);
    renderElement(element, this._statsList);

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
