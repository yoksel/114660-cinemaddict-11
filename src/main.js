import Profile from './components/profile';
import Menu from './components/menu';
import Sort from './components/sort';
import FilmsList from './components/films-list';
import Details from './components/details';
import Statistics from './components/statistics';

const QUANTITY_CARDS_UPCOMING = 5;
const QUANTITY_CARDS_TOP = 2;

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const siteFooterElem = document.querySelector(`.footer`);

const profile = new Profile();
const profileTmpl = profile.getTmpl();

const menu = new Menu();
const menuTmpl = menu.getTmpl();

const sort = new Sort();
const sortTmpl = sort.getTmpl();

const details = new Details();
const detailsTmpl = details.getTmpl();

const statistics = new Statistics();
const statisticsTmpl = statistics.getTmpl();

const filmsSectionsData = [
  {
    type: 'upcoming',
    title: 'All movies. Upcoming',
    quantity: QUANTITY_CARDS_UPCOMING
  },
  {
    type: 'extra',
    title: 'Top rated',
    quantity: QUANTITY_CARDS_TOP
  },
  {
    type: 'extra',
    title: 'Most commented',
    quantity: QUANTITY_CARDS_TOP
  }
];

const getFilmsTmpl = () => {
  const filmsSections = filmsSectionsData
    .reduce((prev, data) => {
      const filmsSection = new FilmsList(data);
      prev += filmsSection.getTmpl();
      return prev;
    } ,'');

  return (
    `<section class="films">
      ${filmsSections}
    </section>
    `
  );
};

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

render(siteHeaderElem, profileTmpl);

render(siteMainElem, menuTmpl);
render(siteMainElem, sortTmpl);
render(siteMainElem, getFilmsTmpl());

render(siteFooterElem, statisticsTmpl);

render(document.body, detailsTmpl);
