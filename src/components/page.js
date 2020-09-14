import AbstractSmartComponent from './abstract-smart-component';

export default class Page extends AbstractSmartComponent {
  _getTmpl() {
    return `<section class="films"></section>`;
  }
}
