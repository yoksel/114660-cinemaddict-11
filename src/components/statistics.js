export default class Statistics {
  constructor(counter) {
    this.counter = counter;
  }

  getTmpl() {
    return (
      `<section class="footer__statistics">
        <p>${this.counter} movies inside</p>
      </section>`
    );
  }
}
