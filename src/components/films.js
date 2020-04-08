import FilmsList from './films-list';

const QUANTITY_CARDS_UPCOMING = 5;
const QUANTITY_CARDS_TOP = 2;

const filmsSectionsData = [
  {
    type: `upcoming`,
    title: `All movies. Upcoming`,
    quantity: QUANTITY_CARDS_UPCOMING
  },
  {
    type: `extra`,
    title: `Top rated`,
    quantity: QUANTITY_CARDS_TOP
  },
  {
    type: `extra`,
    title: `Most commented`,
    quantity: QUANTITY_CARDS_TOP
  }
];

export default class Films {
  constructor(data) {
    this.data = data;
  }

  getTmpl() {
    const filmsSections = filmsSectionsData
      .reduce((prev, data) => {
        data.films = this.data.splice(0, data.quantity);
        const filmsSection = new FilmsList(data);
        return prev + filmsSection.getTmpl();
      }, ``);

    return (
      `<section class="films">
        ${filmsSections}
      </section>`
    );
  }
}
