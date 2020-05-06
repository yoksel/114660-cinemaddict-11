export const BAR_HEIGHT = 50;

export const CHART_OPTIONS = {
  plugins: {
    datalabels: {
      font: {
        size: 20
      },
      color: `#ffffff`,
      anchor: `start`,
      align: `start`,
      offset: 40,
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: `#ffffff`,
        padding: 100,
        fontSize: 20
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
      barThickness: 24
    }],
    xAxes: [{
      ticks: {
        display: false,
        beginAtZero: true
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
    }],
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  }
};
