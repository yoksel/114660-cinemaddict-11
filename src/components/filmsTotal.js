export default class FilmsTotal {
  constructor(counter) {
    this.counter = counter;
  }

  getTmpl() {
    return (
      `<p>${this.counter} movies inside</p>`
    );
  }
}
