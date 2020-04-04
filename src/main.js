import Profile from './components/profile';
import Menu from './components/menu';
import Sort from './components/sort';
import Films from './components/films';
import Details from './components/details';
import Statistics from './components/statistics';

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const siteFooterElem = document.querySelector(`.footer`);

const profile = new Profile();
const menu = new Menu();
const sort = new Sort();
const films = new Films();
const details = new Details();
const statistics = new Statistics();

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

render(siteHeaderElem, profile.getTmpl());

render(siteMainElem, menu.getTmpl());
render(siteMainElem, sort.getTmpl());
render(siteMainElem, films.getTmpl());

render(siteFooterElem, statistics.getTmpl());

render(document.body, details.getTmpl());
