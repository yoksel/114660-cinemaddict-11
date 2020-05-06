import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {createElement, renderElement} from "../../helpers";
import {BAR_HEIGHT, CHART_OPTIONS} from "./constants";

export const renderChart = (container, watchedByGenre) => {
  if (Object.values(watchedByGenre).length === 0) {
    return;
  }

  const wrapperElement = createElement(`<div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>`);
  const canvasElement = wrapperElement.querySelector(`.statistic__chart`);
  const labels = Object.keys(watchedByGenre);
  const data = Object.values(watchedByGenre);

  canvasElement.height = BAR_HEIGHT * labels.length;

  renderElement(container, wrapperElement);

  // eslint-disable-next-line no-new
  new Chart(canvasElement, {
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
};
